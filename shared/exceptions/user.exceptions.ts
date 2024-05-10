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

export const WrongPasswordException = () =>
  new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      message: 'The password you entered is incorrect',
    },
    HttpStatus.BAD_REQUEST,
  );
export const EmailDoesNotExistLoginException = () =>
  new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      message: 'There is no account with this email address',
    },
    HttpStatus.BAD_REQUEST,
  );
