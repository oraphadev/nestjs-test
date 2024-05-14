import { Body, Controller, Get, Post } from '@nestjs/common';
import { Post as PostEntity } from '@prisma/client';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Post()
  async create(@Body() payload: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(payload);
  }
}
