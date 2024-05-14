import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async create(payload: CreateUserDto): Promise<User> {
    const alreadyExists = await this.findOne({ email: payload.email });
    if (alreadyExists) {
      throw new UserAlreadyExistsException();
    }
    const user = await this.prisma.user.create({
      data: payload,
    });
    return user;
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }
}
