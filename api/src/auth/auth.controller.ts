import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import type { Response } from 'express';

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
async googleCallback(
  @Req() req: any,
  @Res() res: Response,
) {
  const result =
    await this.authService.validateGoogleUser(
      req.user,
    );

    console.log('Redirecting user:', {
  token: result.accessToken,
  role: result.user.role,
  status: result.user.status,
});
  res.redirect(
    `http://localhost:5173/auth-success?token=${result.accessToken}&role=${result.user.role}&status=${result.user.status}`,
  );
}
}