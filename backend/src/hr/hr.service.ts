import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { employeeData, Status } from './employee.dto';
import { employeeUpdate } from './employeeUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { EmployeeInfo } from './employee.entity';
import * as bcrypt from 'bcrypt'
import { userInformation } from './userInfo.dto';
import { userCredentials } from './userInfo.entity';
import { BoardingCheck } from './boarding.dto';
import { BoardingCheckList } from './boarding.entity';

@Injectable()
export class HrService {

  constructor(@InjectRepository(EmployeeInfo) private employeeInfoRepo:Repository<EmployeeInfo>,
  @InjectRepository(userCredentials) private userCredent:Repository<userCredentials>,
  @InjectRepository(BoardingCheckList) private boardingCheckList:Repository<BoardingCheckList>
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
    const salt= await bcrypt.genSalt();
    const hassedpassword=await bcrypt.hash(empCred.password,salt);
    empCred.password=hassedpassword;
    const emplo=this.userCredent.create({...empCred,employeeInfo:emp})
    return this.userCredent.save(emplo);
    //const isMatch = await bcrypt.compare(password(user_input_string), dbpassword);
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
    this.userCredent.delete({employeeInfo:{id:id}});
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

  async createBoarding(id: number, boardData:BoardingCheck):Promise<BoardingCheck>{
    const emp=await this.employeeInfoRepo.findOneBy({id:id});
    if(!emp){
      throw new NotFoundException('Employee ID does not exist')
    }
    const empBoard=this.boardingCheckList.create({...boardData,employeeInfo:emp})
    return this.boardingCheckList.save(empBoard);
  }

  async showBoarding(id: number):Promise<BoardingCheck[]>{
    const accessory=await this.boardingCheckList.find({where:{employeeInfo:{id:id}},relations: ['employeeInfo'],});
    if(accessory.length===0){
      throw new NotFoundException('Boarding Data not found')
    }
    return accessory;
  }

  async updateBoarding(id: number, boardData:BoardingCheck):Promise<BoardingCheck|null>{
    const accessory=await this.boardingCheckList.findOne({select:{id:true},where:{employeeInfo:{id:id}},relations: ['employeeInfo'],});
    if(!accessory){
      throw new NotFoundException('Boarding Data not found')
    }
    const bId=accessory.id;
    for(const key in boardData){
      if(boardData[key]!==undefined){
        await this.boardingCheckList.update({id:bId}, {[key]:boardData[key]});
      }
    }
    return this.boardingCheckList.findOneBy({id:bId});
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
