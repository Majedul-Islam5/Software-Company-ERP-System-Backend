
import { Injectable } from '@nestjs/common';
import { ProjectCreateDTO, ProjectStatus } from './projectCreateDTO';
import { ProjectUpdateDTO } from './projectUpdateDTO';
import { ProjectUpdateStatusDTO } from './projectUpdateStatusDTO';

@Injectable()
export class ProjectManagerService {
  getHello(): string {
    return 'Hello World!';
  }

//    PROJECT RELATED SERVICES
  postProjectDetails(projectData:ProjectCreateDTO): object {
    return {
        success:true,
        message:"Project successfully created",
        data:projectData
    }
  }

  getALLProjectDetails():object{
    return {
        success:true,
        message:"All project data retrieved successfully"
    }
  }

  getIndividualProjectDetails(id:string):object{
    return {
        success:true,
        message:`Retrieved details of project ${id}`
    }
  }


  updateProjectDetails(updateProjectDetails:ProjectUpdateDTO,id:string):object{
    return {
        success:true,
        message:`Project details of ${id} has been updated`,
        data:updateProjectDetails
    }
  }

  updateProjectStatus(updateStatus:ProjectUpdateStatusDTO,id:string):object{
    return {
        success:true,
        message:`Project status of ${id} has been updated to ${updateStatus.status}`,
        
    }
  }


  deleteProject(id:string):object{
    return {
        success:true,
        message:`Project details of ${id} has been deleted`,  
    }
  }

//   REPORT RELATED SERVICES

  uploadSRSDocument(id:string):object{
    return {
        success:true,
        message:`Report of ${id} project has been uploaded`,  
    }
  }

  deleteSRSDocument(id:string):object{
    return {
        success:true,
        message:`Report of ${id} project has been deleted`,  
    }
  }

}

