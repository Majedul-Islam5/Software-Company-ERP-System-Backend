import { Module } from '@nestjs/common';
import { HrController } from './hr.controller';
import { HrService } from './hr.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeInfo } from './employee.entity';
import { userCredentials } from './userInfo.entity';
import { BoardingCheckList } from './boarding.entity';
import { SalaryInfo } from './salary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeInfo]),TypeOrmModule.forFeature([userCredentials]),TypeOrmModule.forFeature([BoardingCheckList]),TypeOrmModule.forFeature([SalaryInfo])],
  controllers: [HrController],
  providers: [HrService],
})
export class HrModule {}
