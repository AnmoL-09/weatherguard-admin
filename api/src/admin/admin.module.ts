import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { UsersModule } from '../users/users.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [
    UsersModule,
    TelegramModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}