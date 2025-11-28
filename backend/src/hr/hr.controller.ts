import { Controller, Get ,Post,Delete,Put,Patch, Param,Query, Body, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { HrService } from './hr.service';
import { employeeData, Status } from './employee.dto';
import { employeeUpdate } from './employeeUpdate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { userInformation } from './userInfo.dto';
import { BoardingCheck } from './boarding.dto';

@Controller("hr")
export class HrController{
  constructor(private readonly hrService: HrService){}

  @Get("employee")
  getEmployee():object{
    return this.hrService.getEmployee();
  }

  @Get("employee/:id")
  getEmployeeById(@Param('id',ParseIntPipe) id:number):object{
    return this.hrService.getEmployeeById(id);
  }

  @Get("leaves")
  leaves():object{  
    return this.hrService.leaves();
  }

  @Get("announcements")
  showAnnouncements():object{  
    return this.hrService.showAnnouncements();
  }

  @Post("employee")
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
  @UsePipes(new ValidationPipe())
  createEmpCredential(@Param('id',ParseIntPipe) id:number,@Body() empCred:userInformation):object{  
    return this.hrService.createEmpCredential(id,empCred);
  }

  @Delete("employee/:id")
  terminateEmp(@Param('id', ParseIntPipe) id:number) {
    return this.hrService.terminateEmp(id);
  }

  @Delete("deleteEmployee/:id")
  deleteEmp(@Param('id', ParseIntPipe) id:number) {
    return this.hrService.deleteEmp(id);
  }

  @Put("employee/:id")
  @UsePipes(new ValidationPipe())
  updateEmp(@Param('id', ParseIntPipe) id: number,@Body() empUpdate:employeeUpdate):object{  
    return this.hrService.updateEmp(id,empUpdate);
  }

  @Patch("leaves/:id")
  @UsePipes(new ValidationPipe())
  updateLeave(@Param('id', ParseIntPipe) id: number):object{  
    return this.hrService.updateLeave(id);
  }

  @Post("employee/onboarding/:id")
  @UsePipes(new ValidationPipe())
  createBoarding(@Param('id', ParseIntPipe) id: number,@Body() boardData:BoardingCheck):object{
    return this.hrService.createBoarding(id,boardData);
  }

  @Get("employee/onboarding/:id")
  showBoarding(@Param('id', ParseIntPipe) id: number):object{
    return this.hrService.showBoarding(id);
  }

  @Put("employee/onboarding/:id")
  @UsePipes(new ValidationPipe())
  updateBoarding(@Param('id', ParseIntPipe) id: number,@Body() boardData:BoardingCheck):object{
    return this.hrService.updateBoarding(id,boardData);
  }

/////addiotional

  @Get("Status/:value")
  getStatus(@Param('value') value:Status):object{  
    return this.hrService.getStatus(value);
  }


}
