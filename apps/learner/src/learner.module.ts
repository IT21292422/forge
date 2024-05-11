import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/db.module';
import { LearnerController } from './learner.controller';
import { LearnerService } from './learner.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LearnerController],
  providers: [LearnerService],
})
export class LearnerModule {}
