import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
