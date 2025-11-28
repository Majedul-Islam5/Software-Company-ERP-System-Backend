import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { employeeData, Status } from './employee.dto';
import { employeeUpdate } from './employeeUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { EmployeeInfo } from './employee.entity';
import { error } from 'console';
import { userInformation } from './userInfo.dto';
import { userCredentials } from './userInfo.entity';

@Injectable()
export class HrService {

  constructor(@InjectRepository(EmployeeInfo) private employeeInfoRepo:Repository<EmployeeInfo>,
  @InjectRepository(userCredentials) private userCredent:Repository<userCredentials>
  ){}

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

  async createEmp(empData:employeeData,file: Express.Multer.File):Promise<employeeData>{
    const empInfo=this.employeeInfoRepo.create({...empData,userImage:file.filename})
    return this.employeeInfoRepo.save(empInfo);
  }

  async createEmpCredential(id:number,empCred:userInformation):Promise<userInformation>{  
    const emp=await this.employeeInfoRepo.findOneBy({id:id});
    if(!emp){
      throw new NotFoundException('Employee ID does not exist')
    }
    const emplo=this.userCredent.create({...empCred,employeeInfo:emp})

    return this.userCredent.save(emplo);
  }

  async updateEmp(id :number,empUpdate:employeeUpdate):Promise<employeeData|null>{
    for(const key in empUpdate){

      if(empUpdate[key]!==undefined){
        await this.employeeInfoRepo.update(id, {[key]:empUpdate[key]});
      }

    }
    return this.employeeInfoRepo.findOneBy({id:id});
  }

  async terminateEmp(id:number):Promise<null>{
    const emp=await this.employeeInfoRepo.findOneBy({id:id});
    if(!emp){
      throw new NotFoundException('Employee ID does not exist')
    }
    await this.employeeInfoRepo.update(id, {status:Status.InActive});
    this.userCredent.delete(id);
    return null;
  }

  async deleteEmp(id:number):Promise<null>{
    const emp=await this.employeeInfoRepo.findOneBy({id:id});
    if(!emp){
      throw new NotFoundException('Employee ID does not exist')
    }
    if(((await this.employeeInfoRepo.find({where:{id:id, status:Status.InActive},})).length===0)){
      throw new BadRequestException('Selected employee is active')
    }
    this.employeeInfoRepo.delete(id);
    return null;
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
    
  getStatus(value:Status):object{  
    return this.employeeInfoRepo.find({
      where:{status:value}
    });
  }

}
