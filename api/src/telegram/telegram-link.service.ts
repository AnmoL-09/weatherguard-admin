import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

import { UsersService } from '../users/users.service';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './dto/telegram-update.dto';

@Injectable()
export class TelegramLinkService {
  private readonly logger = new Logger(
    TelegramLinkService.name,
  );

  /** Link token validity in minutes (default: 15) */
  private readonly tokenExpiryMinutes: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly telegramService: TelegramService,
    private readonly configService: ConfigService,
  ) {
    this.tokenExpiryMinutes =
      this.configService.get<number>(
        'TELEGRAM_LINK_TOKEN_EXPIRY_MINUTES',
      ) ?? 15;
  }

  /**
   * Generate a deep-link URL for the authenticated user.
   * Stores a single-use token in the database.
   */
  async generateConnectLink(userId: string) {
    const user =
      await this.usersService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // If already linked, return early
    if (user.telegramChatId) {
      return {
        telegramUrl: null,
        alreadyLinked: true,
      };
    }

    const token = randomUUID();

    const expiresAt = new Date(
      Date.now() +
        this.tokenExpiryMinutes * 60 * 1000,
    );

    await this.usersService.setTelegramLinkToken(
      userId,
      token,
      expiresAt,
    );

    const botUsername =
      this.configService.get<string>(
        'TELEGRAM_BOT_USERNAME',
      );

    const telegramUrl =
      `https://t.me/${botUsername}?start=${token}`;

    this.logger.log(
      `Generated connect link for user ${userId}`,
    );

    return {
      telegramUrl,
      alreadyLinked: false,
    };
  }

  /**
   * Process an incoming Telegram webhook update.
   * Handles /start TOKEN deep-link messages.
   */
  async processWebhookUpdate(
    update: TelegramUpdate,
  ) {
    const message = update.message;

    if (!message?.text) {
      return { ok: true };
    }

    const text = message.text.trim();

    // Only handle /start commands with a token payload
    if (!text.startsWith('/start ')) {
      return { ok: true };
    }

    const token = text
      .substring('/start '.length)
      .trim();

    if (!token) {
      return { ok: true };
    }

    const chatId = String(message.chat.id);

    // Find user by the link token
    const user =
      await this.usersService.findByTelegramLinkToken(
        token,
      );

    if (!user) {
      this.logger.warn(
        `Invalid or expired link token: ${token}`,
      );

      await this.telegramService.sendMessage(
        chatId,
        '❌ This link is invalid or has expired.\n\nPlease generate a new link from the WeatherGuard app.',
      );

      return { ok: true };
    }

    // Link the Telegram account
    await this.usersService.linkTelegram(
      user._id.toString(),
      chatId,
    );

    this.logger.log(
      `Linked Telegram chatId ${chatId} to user ${user.email}`,
    );

    await this.telegramService.sendMessage(
      chatId,
      `✅ Telegram account linked!\n\nHello ${user.name}, your Telegram is now connected to WeatherGuard.\n\nYou will receive weather alerts here once your account is approved.`,
    );

    return { ok: true, linked: true };
  }

  /**
   * Check whether a user has linked their Telegram.
   */
  async getTelegramStatus(userId: string) {
    const user =
      await this.usersService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      linked: !!user.telegramChatId,
      linkedAt: user.telegramLinkedAt ?? null,
    };
  }
}
