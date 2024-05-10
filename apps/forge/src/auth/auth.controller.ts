import { Body, Controller, Post } from '@nestjs/common';
import {
  EmailDoesNotExistLoginException,
  WrongPasswordException,
} from 'shared/exceptions/user.exceptions';
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
    } = await this.authService.validateUser(
      params.email,
      params.password,
      params.role,
    );

    if (result.error === 'nouser') {
      throw EmailDoesNotExistLoginException();
    } else if (result.error === 'invalidpassword') {
      return WrongPasswordException();
    } else {
      return result.userObject;
    }
  }
}
