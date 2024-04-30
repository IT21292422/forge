import { Controller, Get } from '@nestjs/common';
import { LearnerService } from './learner.service';

@Controller()
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @Get()
  getHello(): string {
    return this.learnerService.getHello();
  }
}
