import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password: pass }: SignInDto, res: Response) {
    const user = await this.usersService.findOne({ email });
    const passwordMatch = await bcrypt.compare(pass, String(user?.password));

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    const token = await this.jwtService.signAsync(payload);

    res.cookie('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.send({ success: true, status: 'AUTHENTICATED' });
  }

  async signUp({ name, email, password }: SignUpDto, res: Response) {
    const existingUser = await this.usersService.findOne({ email });

    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.signIn({ ...user, password }, res);
  }

  async signOut(res: Response) {
    res.clearCookie('auth');
    return res.send({ success: true, status: 'LOGGED_OUT' });
  }

  async getProfile(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.usersService.findOne({ id });

    return user;
  }
}
