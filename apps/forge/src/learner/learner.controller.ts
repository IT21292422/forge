import { Body, Controller, Get } from '@nestjs/common';
import { courseDTO } from './dto/create-learner.dto';
import { LearnerService } from './learner.service';

@Controller('learner')
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @Get('add')
  create(@Body() createLearnerDto: courseDTO) {
    return this.learnerService.create(createLearnerDto);
  }

  @Get('findeall')
  findAll() {
    return this.learnerService.findAll();
  }

  @Get('findeone')
  findOne(@Body() id: number) {
    return this.learnerService.findOne(id);
  }

  @Get('update')
  update(@Body() updateLearnerDto: courseDTO) {
    return this.learnerService.update(updateLearnerDto);
  }

  
  @Get('remove')
  remove(@Body() id: number) {
    return this.learnerService.remove(id);
  }
}
