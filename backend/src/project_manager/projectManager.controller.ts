import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ProjectCreateDTO } from './projectCreateDTO';
import { ProjectManagerService } from './projectManager.service';
import { ProjectUpdateDTO } from './projectUpdateDTO';
import { ProjectUpdateStatusDTO } from './projectUpdateStatusDTO';


@Controller("project")
export class ProjectManagerController {
  constructor(private readonly projectManagerService: ProjectManagerService) {}

//   PROJECT RELATED ROUTES

  @Post("create")
  postProjectDetails(@Body()projectData:ProjectCreateDTO):object{
      return this.projectManagerService.postProjectDetails(projectData)
  }
  @Get("allProject")
  getALLProjectDetails():object{
      return this.projectManagerService.getALLProjectDetails()
  }

  @Get("projectDetails/:id")
  getIndividualProjectDetails(@Param("id")id:string):object{
      return this.projectManagerService.getIndividualProjectDetails(id)
  }


  @Put("update/:id")
  updateProjectDetails(@Body()updateProjectDetails:ProjectUpdateDTO,@Param("id")id:string): object {
    return this.projectManagerService.updateProjectDetails(updateProjectDetails,id);
  }

  @Patch("updateStatus/:id")
  updateProjectStatus(@Body()updateStatus:ProjectUpdateStatusDTO,@Param("id")id:string): object {
    return this.projectManagerService.updateProjectStatus(updateStatus,id);
  }

  @Delete(":id")
  deleteProject(@Param("id")id:string): object {
    return this.projectManagerService.deleteProject(id);
  }

//   REPORT RELATED ROUTES

   @Post("report")
  uploadSRSDocument(@Query("id")id:string): object {
    return this.projectManagerService.uploadSRSDocument(id);
  }

   @Delete("report/:id")
  deleteSRSDocument(@Param("id")id:string): object {
    return this.projectManagerService.deleteSRSDocument(id);
  }

}
