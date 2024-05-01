import { HttpException, HttpStatus } from '@nestjs/common';

export const UserAlreadyExistsException = (error) =>
  new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      message: 'An Account with this email already exists',
      error: error.message,
    },
    HttpStatus.BAD_REQUEST,
  );
