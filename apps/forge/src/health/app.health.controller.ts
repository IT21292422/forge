import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Controller('health')
export class HealthController {
  constructor(private readonly appService: AppService) {}

  @Get('notifications')
  async getApphealth(): Promise<Observable<any>> {
    return await this.appService.getNotificationHealth();
  }

  //Add your health check here
}
