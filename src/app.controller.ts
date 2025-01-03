import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

interface HomeViewModel {
  message: string;
  title?: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('Home')
  getHello(): HomeViewModel {
    return { message: this.appService.getHello() };
  }
}
