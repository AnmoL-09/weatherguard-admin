import { Controller, Get } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('test-login')
  async testLogin() {
    return this.authService.validateGoogleUser({
      email: 'test@gmail.com',
      name: 'Test User',
      picture: '',
    });
  }
}