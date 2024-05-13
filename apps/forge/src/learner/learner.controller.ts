import { Body, Controller, Get, Param } from '@nestjs/common';
import { courseDTO } from './dto/create-learner.dto';
import { LearnerService } from './learner.service';

@Controller('learner')
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @Get('add')
  create(@Body() createLearnerDto: courseDTO) {
    return this.learnerService.create(createLearnerDto);
  }

  @Get()
  findAll() {
    return this.learnerService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
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
