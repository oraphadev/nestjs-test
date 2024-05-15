import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Post as PostEntity, Prisma } from '@prisma/client';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Post()
  async create(@Body() payload: Prisma.PostCreateInput): Promise<PostEntity> {
    return this.postsService.create(payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.remove({ id });
  }
}
