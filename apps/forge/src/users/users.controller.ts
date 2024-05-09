import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from 'shared/events/auth.events';
import { UserAlreadyExistsException } from 'shared/exceptions/user.exceptions';
import {
  CreateInstructorRequestDTO,
  CreateStudentRequestDTO,
} from './dto/user.dto';
import { Instructor } from './instructor/model/instructor.model';
import { Student } from './student/model/student.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Inject('NOTIFICATIONS_SERVICE')
  private readonly notificationsClient: ClientProxy;

  @Get('/:role')
  async getAllUsers(
    @Param('role') role: string,
  ): Promise<Student[] | Instructor[]> {
    if (role === 'student') {
      return await this.usersService.findAll('student');
    } else {
      return await this.usersService.findAll('instructor');
    }
  }

  @Get('/:role/:id')
  async getUserById(
    @Param() params: { id: string; role: string },
  ): Promise<Student | Instructor> {
    return await this.usersService.findOne(params.id.valueOf(), params.role);
  }

  @Post()
  async createUser(
    @Body() user: CreateStudentRequestDTO | CreateInstructorRequestDTO,
  ) {
    try {
      const result = await this.usersService.create(user);
      this.notificationsClient.emit(
        'user_created',
        new CreateUserEvent(user.email),
      );
      return result;
    } catch (error) {
      if (error.code === 11000) {
        throw UserAlreadyExistsException(error);
      }
      throw new BadRequestException(error.message, 'Error creating user');
    }
  }

  //Have to send the entire courses object. Not just the new ones
  @Patch('/:role/:id')
  async updateUser(
    @Param() params: { id: string; role: string },
    @Body() update: { enrolledCourses: string[] },
  ): Promise<Student | Instructor> {
    return await this.usersService.updateUser(
      params.id.valueOf(),
      params.role,
      update,
    );
  }

  @Delete('/:role/:id')
  async deleteUser(@Param() params: { id: string; role: string }) {
    return await this.usersService.deleteUser(params.id.valueOf(), params.role);
  }
}
