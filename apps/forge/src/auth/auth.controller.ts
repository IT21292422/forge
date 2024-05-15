import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  LoginInstructorResponseDTO,
  LoginStudentResponseDTO,
} from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() params: { email: string; password: string; role: string },
  ) {
    const result: {
      userObject?: LoginStudentResponseDTO | LoginInstructorResponseDTO;
      error?: 'nouser' | 'invalidpassword';
      token?: string;
    } = await this.authService.validateUser(
      params.email,
      params.password,
      params.role,
    );

    if (result.error === 'nouser') {
      throw new HttpException(
        'There is no account with this email address',
        HttpStatus.NOT_FOUND,
      );
    } else if (result.error === 'invalidpassword') {
      console.log(
        '🚀 ~ file: auth.controller.ts ~ line 34 ~ AuthController ~ login ~ result for invalidpassword',
        result,
      );

      throw new HttpException(
        'The password you entered is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      return { ...result.userObject, token: result.token };
    }
  }
}
