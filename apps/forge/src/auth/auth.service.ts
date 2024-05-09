import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Instructor } from '../users/instructor/model/instructor.model';
import { Student } from '../users/student/model/student.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
  ) {}

  onModuleInit() {
    console.log(`Auth service has been initialized on port 3005`);
  }

  //   async signIn(credentials: LoginUserRequestDTO): Promise<any> {
  //     const user = await this.validateUser(
  //       credentials.email,
  //       credentials.password,
  //       credentials.role,
  //     );
  //     if (user?.password !== pass) {
  //       throw new UnauthorizedException();
  //     }
  //     const { password, ...result } = user;
  //     // TODO: Generate a JWT and return it here
  //     // instead of the user object
  //     return result;
  //   }

  //   async login(user: LoginUserRequestDTO) {
  //     const payload = { email: user.email, role: user.role };
  //     return {
  //       access_token: this.jwtService.sign(payload),
  //     };
  //   }

  async validateUser(
    email: string,
    password: string,
    role: string,
  ): Promise<
    Student | Instructor | { status: 'nouser' } | { status: 'invalidpassword' }
  > {
    let user;

    if (role === 'student') {
      user = await this.studentModel.findOne({ email }).exec();
    } else {
      user = await this.instructorModel.findOne({ email }).exec();
    }

    if (!user) {
      return { status: 'nouser' };
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 'invalidpassword' };
    }

    return { ...user, status: 'valid' };
  }
}
