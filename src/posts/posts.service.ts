import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { AuthorNotFoundException } from './exceptions/author-not-found.exception';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async findAll() {
    const posts = await this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return posts;
  }

  async create(payload: Prisma.PostCreateInput) {
    const authorExists = await this.usersService.findOne({
      id: payload.author?.connect?.id,
    });
    if (!authorExists) {
      throw new AuthorNotFoundException();
    }
    const post = await this.prisma.post.create({
      data: payload,
    });
    return post;
  }

  async remove(where: Prisma.PostWhereUniqueInput) {
    return this.prisma.post.delete({
      where,
    });
  }
}
