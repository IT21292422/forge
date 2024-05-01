import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpRequestDTO } from 'shared/dto/auth.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //3000/api/users
  @Post()
  createUser(@Body() signUpRequest: SignUpRequestDTO) {
    this.appService.createUser(signUpRequest);
  }
}
