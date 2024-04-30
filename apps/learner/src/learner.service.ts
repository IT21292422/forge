import { Injectable } from '@nestjs/common';

@Injectable()
export class LearnerService {
  getHello(): string {
    return 'Hello World!';
  }
}
