import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() payload: CreateUserDto): Promise<User> {
    return this.usersService.create(payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove({ id });
  }
}
