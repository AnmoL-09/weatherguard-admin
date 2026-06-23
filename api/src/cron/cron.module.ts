import { Module } from '@nestjs/common';
import { WeatherAlertService } from './weather-alert.service';
import { UsersModule } from 'src/users/users.module';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [
    UsersModule,
    TelegramModule,
  ],
  providers: [WeatherAlertService],
})
export class CronModule {}