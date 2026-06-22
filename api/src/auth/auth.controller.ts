import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: any) {
    return this.authService.validateGoogleUser(
      req.user,
    );
  }
}