import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
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

  async create({ password, ...payload }: CreateUserDto): Promise<User> {
    const alreadyExists = await this.findOne({ email: payload.email });
    if (alreadyExists) {
      throw new UserAlreadyExistsException();
    }
    const user = await this.prisma.user.create({
      data: {
        ...payload,
        password: bcrypt.hashSync(password, 10),
      },
    });
    return user;
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
