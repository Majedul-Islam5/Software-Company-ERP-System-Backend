import { Controller, Get ,Post,Delete,Put,Patch, Param,Query, Body } from '@nestjs/common';
import { HrService } from './hr.service';
import { employeeData } from './employee.dto';

@Controller("hr")
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Get("employee")
  getEmployee(): object {
    return this.hrService.getEmployee();
  }

  @Get("employee/:id")
  getEmployeeById(@Param('id') id:number): object {
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
  createEmp(@Body() empData:employeeData):object{  //service eo employeeData use korbo or object
    return this.hrService.createEmp(empData);
  }

  @Delete("employee/:id")
  deleteEmp(@Param('id') id:number): object {
    return this.hrService.deleteEmp(id);
  }

  @Put("employee/:id")
  updateEmp(@Param('id') id: number,@Body() empData:employeeData):object{  //update same dto use korle sob info required?
    return this.hrService.updateEmp(id,empData);
  }

  @Patch("leaves/:id")
  updateLeave(@Param('id') id: number):object{  
    return this.hrService.updateLeave(id);
  }
}
