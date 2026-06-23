import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { UserStatus } from './enums/user-status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findPendingUsers() {
    return this.userModel.find({
      status: UserStatus.PENDING,
    });
  }

  async approveUser(userId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        status: UserStatus.APPROVED,
      },
      {
        new: true,
      },
    );
  }

  async rejectUser(userId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        status: UserStatus.REJECTED,
      },
      {
        new: true,
      },
    );
  }

  async findApprovedUsers() {
  return this.userModel.find({
    status: UserStatus.APPROVED,
    telegramChatId: { $exists: true },
  });
}

  async findById(userId: string) {
    return this.userModel.findById(userId);
  }

  async setTelegramLinkToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        telegramLinkToken: token,
        telegramLinkTokenExpiresAt: expiresAt,
      },
      { new: true },
    );
  }

  async findByTelegramLinkToken(token: string) {
    return this.userModel.findOne({
      telegramLinkToken: token,
      telegramLinkTokenExpiresAt: { $gt: new Date() },
    });
  }

  async linkTelegram(
    userId: string,
    chatId: string,
  ) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        telegramChatId: chatId,
        telegramLinkedAt: new Date(),
        $unset: {
          telegramLinkToken: 1,
          telegramLinkTokenExpiresAt: 1,
        },
      },
      { new: true },
    );
  }
}