import { Controller, Get } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
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
}