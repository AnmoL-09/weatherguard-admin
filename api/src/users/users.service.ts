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
}