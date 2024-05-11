import { Injectable } from '@nestjs/common';
import { courseDTO } from './dto/create-learner.dto';

@Injectable()
export class LearnerService {
  create(createLearnerDto: courseDTO) {
    return 'This action adds a new learner';
  }

  findAll() {
    return `This action returns all learner`;
  }

  findOne(id: number) {
    return `This action returns a learner`;
  }

  update(updateLearnerDto: courseDTO) {
    return `This action updates a learner`;
  }

  remove(id: number) {
    return `This action removes a #${id} learner`;
  }
}
