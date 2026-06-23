import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegramService {
  private readonly botToken =
    process.env.TELEGRAM_BOT_TOKEN;

  async sendMessage(
    chatId: string,
    message: string,
  ) {
    const url =
      `https://api.telegram.org/bot${this.botToken}/sendMessage`;

    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
    });

    return response.data;
  }

  async sendApprovalNotification(
  chatId: string,
) {
  return this.sendMessage(
    chatId,
    '✅ WeatherGuard Access Approved\n\nYour account has been approved by an administrator.\n\nYou will now receive scheduled weather alerts.'
  );
}
}