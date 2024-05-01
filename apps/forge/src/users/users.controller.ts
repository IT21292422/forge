import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UserAlreadyExistsException } from 'shared/exceptions/user.exceptions';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './model/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  async getUserById(@Param() params: { id: string }): Promise<User> {
    return await this.usersService.findOne(params.id.valueOf());
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
