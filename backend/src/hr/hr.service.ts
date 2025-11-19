import { Injectable } from '@nestjs/common';
import { employeeData, Status } from './employee.dto';
import { employeeUpdate } from './employeeUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { EmployeeInfo } from './employee.entity';
import { error } from 'console';

@Injectable()
export class HrService {

  constructor(@InjectRepository(EmployeeInfo) private employeeInfoRepo:Repository<EmployeeInfo>){}

  async getEmployee(): Promise<employeeData[]> {
    return this.employeeInfoRepo.find();
  }

  async getEmployeeById(id:number): Promise<employeeData|object> {
    const emp=await this.employeeInfoRepo.findOneBy({id:id});
    if(!emp){
      return {message:"not found employee"}
    }
    else
    {
      return emp;
    }
    
    
  }

  async createEmp(empData:employeeData):Promise<employeeData>{
    return this.employeeInfoRepo.save(empData);
  }

  async updateEmp(id :number,empUpdate:employeeUpdate):Promise<employeeData|null>{
    for(const key in empUpdate){

      if(empUpdate[key]!==undefined){
        await this.employeeInfoRepo.update(id, {[key]:empUpdate[key]});
      }

    }
    return this.employeeInfoRepo.findOneBy({id:id});
  }

  deleteEmp(id:number):object{
    this.employeeInfoRepo.delete({id:id});
    return {message:"employee deleted"};
  }

  leaves():object{  
    return {message:"all leaves"};
  }

  showAnnouncements():object{  
    return {message:"all announcements"};
  }

  updateLeave(id: number):object{  
      return {status:"approved"};
    }


    /////value addiotional

    getAge( val:number):object{  
        return this.employeeInfoRepo.find({
          where:{age:MoreThan(val)}
        });
      }
    
      getStatus(value:Status):object{  
        return this.employeeInfoRepo.find({
          where:{status:value}
        });
      }

}
