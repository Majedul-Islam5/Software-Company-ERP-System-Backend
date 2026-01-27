import { Controller, Get ,Post,Delete,Put,Patch, Param,Query, Body, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, UseGuards, Res, Req, BadRequestException } from '@nestjs/common';
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
import type { Response } from 'express';

@Controller("hr")
export class HrController{
  constructor(private readonly hrService: HrService){}

  @Get('dashboard')
    @UseGuards(AuthGuard)
    dashTest(){
        return this.hrService.dashTest();
    }

  @Post("signIn")
  async signIn(@Body() info:{email:string,password:string},@Res({ passthrough: true }) res: Response){
    const result = await this.hrService.signIn(info);
    res.cookie("access_token", result.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,   // true for production HTTPS
    path: '/',
    maxAge: 300 * 60 * 1000 // 300 mins
  });

  return { message: "Login successful" };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response){
    res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    });

    return { message: "Logged out successfully" };
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
  @UseGuards(AuthGuard)
  sendEmail(@Body() mail:EmailData):object{
    return this.hrService.sendEmail(mail);
  }

  @Get("employee")
  //@UseGuards(AuthGuard)
  getEmployee(@Query('id') id: string):object{
    return this.hrService.getEmployee(id);
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


  @Post("announcements")
  @UseGuards(AuthGuard)
  createAnnouncements(@Body() announce:announcementData,@Req() req: Request):object{
    const userId = (req as any).user.id;
    return this.hrService.createAnnouncements(userId,announce);
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
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    exceptionFactory: (errors) => {
      console.log(' Validation Errors:');

      errors.forEach(err => {
        console.log('Field:', err.property);
        console.log('Constraints:', err.constraints);
        console.log('Value:', err.value);
        console.log('Type:', typeof err.value);
        console.log('----------------------');
      });

      return new BadRequestException(errors);
    },
  }),)
  @UseInterceptors(FileInterceptor('file',
  {fileFilter: (req , file , cb )=>{
      if(file.originalname.match(/\.(jpg|webp|png|jpeg)$/))
          cb(null , true);
      else
      {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', ' image'), false);
      }
  },
  limits:{ fileSize: 3000000000},
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


  @Get("img/:name")
  viewImage(@Param('name') name, @Res() res)
  {
      res.sendFile(name,{root:'./src/hr/assets'});
  }


  @Post("employeeCredential/:id")
  //@UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  createEmpCredential(@Param('id',ParseIntPipe) id:number,@Body() empCred:userInformation):object{  
    return this.hrService.createEmpCredential(id,empCred);
  }

  @Get("employeeCredential/:id")
  //@UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  showEmpCredential(@Param('id',ParseIntPipe) id:number):object{  
    return this.hrService.showEmpCredential(id);
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
