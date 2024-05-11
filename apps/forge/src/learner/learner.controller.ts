import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LearnerService } from './learner.service';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';

@Controller()
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @MessagePattern('createLearner')
  create(@Payload() createLearnerDto: CreateLearnerDto) {
    return this.learnerService.create(createLearnerDto);
  }

  @MessagePattern('findAllLearner')
  findAll() {
    return this.learnerService.findAll();
  }

  @MessagePattern('findOneLearner')
  findOne(@Payload() id: number) {
    return this.learnerService.findOne(id);
  }

  @MessagePattern('updateLearner')
  update(@Payload() updateLearnerDto: UpdateLearnerDto) {
    return this.learnerService.update(updateLearnerDto.id, updateLearnerDto);
  }

  @MessagePattern('removeLearner')
  remove(@Payload() id: number) {
    return this.learnerService.remove(id);
  }
}
