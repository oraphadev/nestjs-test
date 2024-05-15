import { Body, Controller, Get, Post, Request, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response as ExpressResponse } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Res() res: ExpressResponse, @Body() payload: SignInDto) {
    return this.authService.signIn(payload, res);
  }

  @Public()
  @Post('register')
  signUp(@Res() res: ExpressResponse, @Body() payload: SignUpDto) {
    return this.authService.signUp(payload, res);
  }

  @Get('logout')
  logout(@Res() res: ExpressResponse) {
    return this.authService.signOut(res);
  }

  @Get('me')
  profile(
    @Request() req: { currentUser: User },
  ): Promise<Omit<User, 'password'>> {
    return this.authService.getProfile(req.currentUser.id);
  }
}
