import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { employeeData, Status } from './employee.dto';
import { employeeUpdate } from './employeeUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { EmployeeInfo } from './employee.entity';
import * as bcrypt from 'bcrypt'
import { Role, userInformation } from './userInfo.dto';
import { userCredentials } from './userInfo.entity';
import { BoardingCheck } from './boarding.dto';
import { BoardingCheckList } from './boarding.entity';
import { empSalary, Month } from './salary.dto';
import { SalaryInfo } from './salary.entity';
import { empSalaryUpdate } from './salaryUpdate.dto';
import { announcementData } from './annoucement.dto';
import { AnnouncementInfo } from './announcement.entity';
import { announcementUpdate } from './announcementUpdate.dto';

@Injectable()
export class HrService {

  constructor(@InjectRepository(EmployeeInfo) private employeeInfoRepo:Repository<EmployeeInfo>,
  @InjectRepository(userCredentials) private userCredent:Repository<userCredentials>,
  @InjectRepository(BoardingCheckList) private boardingCheckList:Repository<BoardingCheckList>,
  @InjectRepository(SalaryInfo) private salaryInfo:Repository<SalaryInfo>,
  @InjectRepository(AnnouncementInfo) private announcementInfo:Repository<AnnouncementInfo>,
  ){}

  async getEmployee(): Promise<employeeData[]> {
    return this.employeeInfoRepo.find();
  }

  async getEmployeeById(id:number): Promise<employeeData|object> {
    const emp=await this.employeeInfoRepo.findOneBy({id:id});
    if(!emp){
      throw new NotFoundException("Employee data is not found")
    }
    else
    {
      return emp;
    }
    
    
  }

  async createEmp(empData:employeeData,file: Express.Multer.File):Promise<employeeData>{
    const empInfo=this.employeeInfoRepo.create({...empData,userImage:file.filename})
    try{
      return await this.employeeInfoRepo.save(empInfo);
    }
    catch(error){
      throw new BadRequestException("Same email already exists");
    }
    
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
    try{
      return await this.userCredent.save(emplo);
    }
    catch(error){
      throw new BadRequestException("Same email already exists");
    }
    
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

  async createSalary(id: number,employeeSalary:empSalary):Promise<empSalary>{
    const emp=await this.employeeInfoRepo.findOneBy({id:id});
    let total=0;
    if(!emp){
      throw new NotFoundException('Employee ID does not exist')
    }
    for(const key in employeeSalary){
      if(employeeSalary[key]!==undefined){
        if(key==="taxDeduction"){
          total-=employeeSalary[key];
          continue;
        }
        if(key==="month" || key==="year"){
          continue;
        }
        total+=employeeSalary[key];
      }
    }
    total+=emp.salary;
    const empSalary=this.salaryInfo.create({...employeeSalary,basicsalary:emp.salary,totalSalary:total,employeeInfo:emp})
    try{
      return await this.salaryInfo.save(empSalary);
    }
    catch(error){
      throw new BadRequestException('Salary record for this month and year already exists');
    }
    
  }

  async showSalary(id: number):Promise<empSalary[]>{
    const sal:SalaryInfo[]=await this.salaryInfo.find({where:{employeeInfo:{id:id}}});
    if(sal.length===0){
      throw new NotFoundException('Salary Data not found')
    }
    return sal;
  }

  async updateSalary(id: number,month:string,year:number,employeeSalaryUpdate:empSalaryUpdate):Promise<empSalary|null>{
    const monthEnum = Month[month.toUpperCase() as keyof typeof Month];
    const salaryUp=await this.salaryInfo.findOne({select:{id:true},where:{employeeInfo:{id:id},month:monthEnum,year:year}});
    if(!salaryUp){
      throw new NotFoundException('Salary Data not found')
    }
    const sId=salaryUp.id;
    for(const key in employeeSalaryUpdate){
      if(employeeSalaryUpdate[key]!==undefined){
        await this.salaryInfo.update({id:sId}, {[key]:employeeSalaryUpdate[key]});
      }
    }
    return await this.salaryInfo.findOneBy({id:sId});
  }

  leaves():object{  
    return {message:"all leaves"};
  }

  async createAnnouncements(id:number,announce:announcementData):Promise<announcementData>{
    const emp=await this.employeeInfoRepo.findOneBy({id:id});
    if(!emp){
      throw new NotFoundException('Employee ID does not exist')
    }
    const hremp= await this.userCredent.findOne({where:{role:Role.HR,employeeInfo:{id:emp.id}}})
    if(!hremp){
      throw new BadRequestException("Only hr to post annoucement")
    }
    const announcement=await this.announcementInfo.create({...announce,hrInfo:emp});
    return this.announcementInfo.save(announcement);
  }

  async showAnnouncements(id:number):Promise<announcementData[]>{  
    return await this.announcementInfo.find({where:{hrInfo:{id:id}}});
  }

  async updateAnnouncements(id:number,announce:announcementUpdate):Promise<announcementData|null>{  
    const announceMent=await this.announcementInfo.findOneBy({id:id});
    for(const key in announce){
      if(announce[key]!==undefined){
        await this.announcementInfo.update(id, {[key]:announce[key]});
      }
    }
    return this.announcementInfo.findOneBy({id});
  }

  async deleteAnnouncements(id:number):Promise<null>{
    const announceMent=await this.announcementInfo.findOneBy({id:id});
    if(!announceMent){
      throw new NotFoundException("Announcement not found")
    }
    await this.announcementInfo.delete(id);
    return null;
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
