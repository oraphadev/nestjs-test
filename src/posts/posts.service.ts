import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
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

  async create(payload: CreatePostDto) {
    const authorExists = await this.usersService.findOne({
      id: payload.authorId,
    });
    if (!authorExists) {
      throw new AuthorNotFoundException();
    }
    const post = await this.prisma.post.create({
      data: payload,
    });
    return post;
  }
}
