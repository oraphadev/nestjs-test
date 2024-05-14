import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthorNotFoundException extends HttpException {
  constructor() {
    super('Author not found', HttpStatus.BAD_REQUEST);
  }
}
