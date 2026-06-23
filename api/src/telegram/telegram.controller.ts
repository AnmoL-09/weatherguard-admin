import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { TelegramService } from './telegram.service';
import { TelegramLinkService } from './telegram-link.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { TelegramUpdate } from './dto/telegram-update.dto';

@Controller('telegram')
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly telegramLinkService: TelegramLinkService,
  ) {}

  @Get('send-test')
  async sendTest() {
    await this.telegramService.sendMessage(
      '692911428',
      '🚀 WeatherGuard Test Alert',
    );

    return {
      success: true,
    };
  }

  @Get('connect')
  getConnectInstructions() {
    return {
      botUsername:
        '@weatherguard_alert_bot',
      instructions:
        'Open bot and send /start',
    };
  }

  /**
   * Generate a Telegram deep-link URL for the
   * authenticated user.
   */
  @UseGuards(JwtAuthGuard)
  @Get('connect-link')
  async getConnectLink(@Req() req: any) {
    return this.telegramLinkService
      .generateConnectLink(req.user.sub);
  }

  /**
   * Check whether the authenticated user has
   * linked their Telegram account.
   */
  @UseGuards(JwtAuthGuard)
  @Get('status')
  async getTelegramStatus(@Req() req: any) {
    return this.telegramLinkService
      .getTelegramStatus(req.user.sub);
  }

  /**
   * Telegram webhook endpoint.
   * Called by Telegram servers — no auth.
   */
  @Post('webhook')
  async handleWebhook(
    @Body() update: TelegramUpdate,
  ) {
    return this.telegramLinkService
      .processWebhookUpdate(update);
  }
}