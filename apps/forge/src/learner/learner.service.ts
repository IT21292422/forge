import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { courseDTO } from './dto/create-learner.dto';

@Injectable()
export class LearnerService {

  constructor(
    @Inject('LEARNER_SERVICE') private readonly learnerClient: ClientProxy,
  ) {}
  
  create(createLearnerDto: courseDTO) {
    return 'This action adds a new learner';
  }

  findAll() {
    return this.learnerClient.send({ cmd: 'get_courses' }, {});
  }

  findOne(id: string) {
    return this.learnerClient.send({ cmd: 'get_course_by_id' }, {id});
  }

  update(updateLearnerDto: courseDTO) {
    return `This action updates a learner`;
  }

  remove(id: number) {
    return `This action removes a #${id} learner`;
  }
}
