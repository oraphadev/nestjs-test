import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  readonly name: string;

  @IsEmail()
  @IsDefined()
  readonly email: string;

  @IsString()
  @IsDefined()
  readonly password: string;
}
