import { Controller, Get ,Post,Delete,Put,Patch, Param,Query, Body, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { HrService } from './hr.service';
import { employeeData, Status } from './employee.dto';
import { employeeUpdate } from './employeeUpdate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { userInformation } from './userInfo.dto';
import { BoardingCheck } from './boarding.dto';
import { empSalary } from './salary.dto';
import { empSalaryUpdate } from './salaryUpdate.dto';
import { announcementData } from './annoucement.dto';
import { announcementUpdate } from './announcementUpdate.dto';
import { AuthGuard } from './auth/auth.guard';
import { EmailData } from './email/email.dto';
import { userInformationUpdate } from './userInfoUpdate.dto';

@Controller("hr")
export class HrController{
  constructor(private readonly hrService: HrService){}

  @Post("signIn")
  signIn(@Body() info:userInformation):object{
    return this.hrService.signIn(info);
  }

  @Post("logout")
  logout(@Body() info:userInformation):object{
    return this.hrService.logout(info);
  }

  /*{
  "to":"mohammadanas241@gmail.com",
  "subject":"Welcome to the Company – Your ERP Login Credentials",
  "message":"Hi  Anas,\nWelcome to [Nexabyte Tech Software Company]!\n\nYour portal login credentials are:\n\tUsername: {username}\n\tTemporary Password: {password}\n\nLogin here: Company Portal\nPlease change your password after your first login.\n\nBest regards,\nHR Team"
  }*/

  /*{
  "to":"mohammadanas241@gmail.com",
  "subject":"Welcome to the Company – Your ERP Login Credentials",
  "message":"Hi Anas,\nWelcome to [Nexabyte Tech Software Company]!\n\nYour portal login credentials are:\n\tUsername: {username}\n\tTemporary Password: {password}\n\nLogin here: <a href=\"nexabyte.com\">Company Portal</a>\nPlease change your password after your first login.\n\nBest regards,\nHR Team"
  }*/


  @Post('email')
  sendEmail(@Body() mail:EmailData):object{
    return this.hrService.sendEmail(mail);
  }

  @Get("employee")
  @UseGuards(AuthGuard)
  getEmployee():object{
    return this.hrService.getEmployee();
  }

  @Get("employee/:id")
  @UseGuards(AuthGuard)
  getEmployeeById(@Param('id',ParseIntPipe) id:number):object{
    return this.hrService.getEmployeeById(id);
  }

  @Get("leaves")
  @UseGuards(AuthGuard)
  leaves():object{  
    return this.hrService.leaves();
  }


  @Post("announcements/:id")
  @UseGuards(AuthGuard)
  createAnnouncements(@Param('id',ParseIntPipe) id:number,@Body() announce:announcementData):object{  
    return this.hrService.createAnnouncements(id,announce);
  }

  @Get("announcements/:id")
  @UseGuards(AuthGuard)
  showAnnouncements(@Param('id',ParseIntPipe) id:number):object{  
    return this.hrService.showAnnouncements(id);
  }

  @Put("announcements/:id")
  @UseGuards(AuthGuard)
  updateAnnouncements(@Param('id',ParseIntPipe) id:number,@Body() announce:announcementUpdate):object{  
    return this.hrService.updateAnnouncements(id,announce);
  }

  @Delete("announcements/:id")
  @UseGuards(AuthGuard)
  deleteAnnouncements(@Param('id',ParseIntPipe) id:number):object{  
    return this.hrService.deleteAnnouncements(id);
  }

  @Post("employee")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file',
  {fileFilter: (req , file , cb )=>{
      if(file.originalname.match(/\.(jpg|webp|png|jpeg)$/))
          cb(null , true);
      else
      {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', ' image'), false);
      }
  },
  limits:{ fileSize: 3000000},
    storage: diskStorage({
    destination: './src/hr/assets',
    filename: function(req , file , cb ){
      cb(null, Date.now()+file.originalname)
    },
  })
  }))
  createEmp(@Body() empData:employeeData,@UploadedFile () file: Express.Multer.File):object{  
    return this.hrService.createEmp(empData,file);
  }

  @Post("employeeCredential/:id")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  createEmpCredential(@Param('id',ParseIntPipe) id:number,@Body() empCred:userInformation):object{  
    return this.hrService.createEmpCredential(id,empCred);
  }

  @Put("employeeCredential/:id")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  updateEmpCredential(@Param('id',ParseIntPipe) id:number,@Body() empCredUpdate:userInformationUpdate):object{  
    return this.hrService.updateEmpCredential(id,empCredUpdate);
  }

  @Delete("employee/:id")
  @UseGuards(AuthGuard)
  terminateEmp(@Param('id', ParseIntPipe) id:number) {
    return this.hrService.terminateEmp(id);
  }

  @Delete("deleteEmployee/:id")
  @UseGuards(AuthGuard)
  deleteEmp(@Param('id', ParseIntPipe) id:number) {
    return this.hrService.deleteEmp(id);
  }

  @Put("employee/:id")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  updateEmp(@Param('id', ParseIntPipe) id: number,@Body() empUpdate:employeeUpdate):object{  
    return this.hrService.updateEmp(id,empUpdate);
  }

  @Patch("leaves/:id")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  updateLeave(@Param('id', ParseIntPipe) id: number):object{  
    return this.hrService.updateLeave(id);
  }

  @Post("employee/onboarding/:id")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  createBoarding(@Param('id', ParseIntPipe) id: number,@Body() boardData:BoardingCheck):object{
    return this.hrService.createBoarding(id,boardData);
  }

  @Get("employee/onboarding/:id")
  @UseGuards(AuthGuard)
  showBoarding(@Param('id', ParseIntPipe) id: number):object{
    return this.hrService.showBoarding(id);
  }

  @Put("employee/onboarding/:id")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  updateBoarding(@Param('id', ParseIntPipe) id: number,@Body() boardData:BoardingCheck):object{
    return this.hrService.updateBoarding(id,boardData);
  }

  @Post("employee/salary/:id")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  createSalary(@Param('id', ParseIntPipe) id: number,@Body() employeeSalary:empSalary):object{
    return this.hrService.createSalary(id,employeeSalary);
  }

  @Get("employee/salary/:id")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  showSalary(@Param('id', ParseIntPipe) id: number):object{
    return this.hrService.showSalary(id);
  }

  @Put("employee/salary/:id")// using query for id throws number string error
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  updateSalary(@Param('id',ParseIntPipe) id:number,@Query('month') month: string,@Query('year', ParseIntPipe) year: number,@Body() employeeSalaryUpdate:empSalaryUpdate):object{
    return this.hrService.updateSalary(id,month,year,employeeSalaryUpdate);
  }

/////additional

  @Get("Status/:value")
  @UseGuards(AuthGuard)
  getStatus(@Param('value') value:Status):object{  
    return this.hrService.getStatus(value);
  }
}
