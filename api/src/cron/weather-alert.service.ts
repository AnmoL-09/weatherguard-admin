import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { UsersService } from '../users/users.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class WeatherAlertService {
  constructor(
    private readonly usersService: UsersService,
    private readonly telegramService: TelegramService,
  ) {}

  @Cron('0 */30 * * * *')
  async handleCron() {
    const users =
      await this.usersService.findApprovedUsers();

    for (const user of users) {
      await this.telegramService.sendMessage(
        user.telegramChatId!,
        `🌦 WeatherGuard Alert

Heavy rain expected today.

Recommendation:
• Carry an umbrella
• Avoid unnecessary travel during peak rainfall`,
      );
    }

    console.log(
  `[WeatherAlertJob] Sent alerts to ${users.length} users`
    );
  }
}