import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectManagerService } from './projectManager.service';
import { ProjectUpdateDTO } from './projectUpdateDTO';
import { ProjectUpdateStatusDTO } from './projectUpdateStatusDTO';
import { ProjectCreateDTO } from './projectCreateDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { UpdateProfileDTO } from './updateProjectManagerProfileDTO';



@Controller("project")
export class ProjectManagerController {
  constructor(private readonly projectManagerService: ProjectManagerService) {}

//   PROJECT RELATED ROUTES

  @Post("create")
  @UsePipes(new ValidationPipe())
  postProjectDetails(@Body()projectData: ProjectCreateDTO):object{
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

  @Put("updateProfile/:id")
  @UsePipes(new ValidationPipe())
  updateUserInfo(@Body()userInfo:UpdateProfileDTO,@Param("id")id:string):object{
    return this.projectManagerService.updateUserInfo(userInfo,id)
  }

  @Delete(":id")
  deleteProject(@Param("id")id:string): object {
    return this.projectManagerService.deleteProject(id);
  }

//   REPORT RELATED ROUTES

   @Post("report")
    @UseInterceptors(FileInterceptor('report', {
      fileFilter: (req, file, cb) => {
       
        if (file.originalname.match(/^.*\.(pdf)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'report'), false);
        }
      },
      limits: { fileSize: 1024*1024*10 }, 
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + file.originalname;
          cb(null, uniqueSuffix);
        },
      }),
    }),
)
  uploadSRSDocument(@Query("id")id:string,@UploadedFile() file: Express.Multer.File): object {
    return this.projectManagerService.uploadSRSDocument(id,file);
  }

   @Get('/srs-document/:name')
 getImages(@Param('name') name, @Res() res) {
 res.sendFile(name,{ root: './srs-report' })
 }

   @Delete("report/:id")
  deleteSRSDocument(@Param("id")id:string): object {
    return this.projectManagerService.deleteSRSDocument(id);
  }

}
