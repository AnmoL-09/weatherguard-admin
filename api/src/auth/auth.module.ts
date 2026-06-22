import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    ConfigModule,
    PassportModule,

JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {

    return {
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: '7d',
      },
    };
  },
}),

    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService 
    , GoogleStrategy
  ],
  exports: [AuthService],
})
export class AuthModule {}