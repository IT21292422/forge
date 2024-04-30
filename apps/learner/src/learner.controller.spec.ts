import { Test, TestingModule } from '@nestjs/testing';
import { LearnerController } from './learner.controller';
import { LearnerService } from './learner.service';

describe('LearnerController', () => {
  let learnerController: LearnerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LearnerController],
      providers: [LearnerService],
    }).compile();

    learnerController = app.get<LearnerController>(LearnerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(learnerController.getHello()).toBe('Hello World!');
    });
  });
});
