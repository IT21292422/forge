import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserAlreadyExistsException } from 'shared/exceptions/user.exceptions';
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
    try {
      return await this.usersService.create(user);
    } catch (error) {
      if (error.code === 11000) {
        throw UserAlreadyExistsException(error);
      }
      throw new BadRequestException(error.message, 'Error creating user');
    }
  }
}
