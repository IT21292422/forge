import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    return await this.usersService.create(user);
  }
}
