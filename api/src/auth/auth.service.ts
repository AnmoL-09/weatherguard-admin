import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../users/schemas/user.schema';
import { UserRole } from '../users/enums/user-role.enum';
import { UserStatus } from '../users/enums/user-status.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(profile: {
    email: string;
    name: string;
    picture: string;
  }) {
    let user = await this.userModel.findOne({
      email: profile.email,
    });

    if (!user) {
      user = await this.userModel.create({
        email: profile.email,
        name: profile.name,
        picture: profile.picture,
        role: UserRole.USER,
        status: UserStatus.PENDING,
      });
    }

    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
      role: user.role,
    });

    return {
      user,
      accessToken: token,
    };
  }
}