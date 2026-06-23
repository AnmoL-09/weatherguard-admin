import {
  Controller,
  Get,
  Patch,
  Param,
} from '@nestjs/common';

import { AdminService } from './admin.service';

import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { Roles } from '../common/decorators/roles.decorator';

import { RolesGuard } from '../common/guards/roles.guard';

@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles('ADMIN')

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  @Get('pending-users')
  async getPendingUsers() {
    return this.adminService.getPendingUsers();
  }

  @Patch('approve/:id')
  async approveUser(
    @Param('id') id: string,
  ) {
    return this.adminService.approveUser(id);
  }

  @Patch('reject/:id')
  async rejectUser(
    @Param('id') id: string,
  ) {
    return this.adminService.rejectUser(id);
  }
}