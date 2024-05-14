import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly authorId: string;

  @IsString()
  @IsDefined()
  readonly title: string;

  @IsString()
  @IsDefined()
  readonly content: string;
}
