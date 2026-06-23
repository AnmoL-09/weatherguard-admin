import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class AdminService {
constructor(
  private readonly usersService: UsersService,
  private readonly telegramService: TelegramService,
) {}

  async getPendingUsers() {
    return this.usersService.findPendingUsers();
  }


async approveUser(userId: string) {

  const user =
    await this.usersService.approveUser(userId);

  if (user?.telegramChatId) {

    await this.telegramService
      .sendApprovalNotification(
        user.telegramChatId,
      );

  }

  return user;
}

  async rejectUser(userId: string) {
    return this.usersService.rejectUser(userId);
  }
}