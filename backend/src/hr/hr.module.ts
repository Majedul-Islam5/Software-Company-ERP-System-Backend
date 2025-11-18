import { Module } from '@nestjs/common';
import { HrController } from './hr.controller';
import { HrService } from './hr.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeInfo } from './employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeInfo])],
  controllers: [HrController],
  providers: [HrService],
})
export class HrModule {}
