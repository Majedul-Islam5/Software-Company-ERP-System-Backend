import { Controller, Get ,Post,Delete,Put,Patch } from '@nestjs/common';
import { HrService } from './hr.service';

@Controller()
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Get()
  getHello(): string {
    return this.hrService.getHello();
  }
}
