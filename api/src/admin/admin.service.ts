import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async getPendingUsers() {
    return this.usersService.findPendingUsers();
  }

  async approveUser(userId: string) {
    return this.usersService.approveUser(userId);
  }

  async rejectUser(userId: string) {
    return this.usersService.rejectUser(userId);
  }
}