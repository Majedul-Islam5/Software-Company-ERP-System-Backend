import { Controller, Get ,Post,Delete,Put,Patch, Param,Query, Body, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { HrService } from './hr.service';
import { employeeData, Status } from './employee.dto';
import { employeeUpdate } from './employeeUpdate.dto';

@Controller("hr")
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Get("employee")
  getEmployee(): object {
    return this.hrService.getEmployee();
  }

  @Get("employee/:id")
  getEmployeeById(@Param('id', ParseIntPipe) id:number): object {
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
  createEmp(@Body() empData:employeeData):object{  
    return this.hrService.createEmp(empData);
  }

  @Delete("employee/:id")
  deleteEmp(@Param('id', ParseIntPipe) id:number): object {
    return this.hrService.deleteEmp(id);
  }

  @Put("employee/:id")
  @UsePipes(new ValidationPipe())
  updateEmp(@Param('id', ParseIntPipe) id: number,@Body() empUpdate:employeeUpdate):object{  
    return this.hrService.updateEmp(id,empUpdate);
  }

  @Patch("leaves/:id")
  updateLeave(@Param('id', ParseIntPipe) id: number):object{  
    return this.hrService.updateLeave(id);
  }

/////addiotional
  @Get("age/:val")
  getAge(@Param('val') val:number):object{  
    return this.hrService.getAge(val);
  }

  @Get("Status/:value")
  getStatus(@Param('value') value:Status):object{  
    return this.hrService.getStatus(value);
  }


}
