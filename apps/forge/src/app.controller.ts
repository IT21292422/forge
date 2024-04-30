import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SignUpRequestDTO } from 'shared/dto/auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createUser(@Body() signUpRequest: SignUpRequestDTO) {
    this.appService.createUser(signUpRequest);
  }
}
