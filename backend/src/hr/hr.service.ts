import { Injectable } from '@nestjs/common';
import { employeeData } from './employee.dto';

@Injectable()
export class HrService {

  getEmployee(): object {
    return {id:"employee info"};
  }

  getEmployeeById(id:number): object {
    return {id:"employee info"};
  }

  createEmp(empData:employeeData):object{
    return {message:"successful"};
  }

  updateEmp(id :number,empData:employeeData):object{
    return {message:"update successfull"};
  }

  deleteEmp(id:number):object{
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

}
