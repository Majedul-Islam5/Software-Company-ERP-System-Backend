import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { adminService } from './admin.service';
import { userDto } from './Dto/user.dto';
import { projectDto } from './Dto/project.dto';

@Controller('admin')
export class adminController {
  constructor(private readonly adminService: adminService) {}
  // --------> Admin Profile <----------
  // see admin profile
  @Get('profile/:id')
  adminProfile(@Param('id') id: string): object {
    return this.adminService.adminProfile(id);
  }
  // Update Admin Profile
  @Patch('profile/:id/update')
  updateAdminProfile(
    @Param('id') id: string,
    @Body() data: Partial<userDto>,
  ): object {
    return this.adminService.updateAdminProfile(id, data);
  }

  // -----------> User Section <------------
  // see all users
  @Get('allUsers')
  allUsers(): object {
    return this.adminService.allUsers();
  }
  // Get users by role
  @Get('users/filter')
  getUsersByRole(@Query('role') role: string) {
    return this.adminService.getUsersByRole(role);
  }
  // create users
  @Post('create/user')
  addUser(@Body() user: userDto): object {
    return this.adminService.addUser(user);
  }
  // Delete User
  @Delete('user/delete/:id')
  deleteUser(@Param('id') id: string): object {
    return this.adminService.deleteUser(id);
  }
  // ---------------------> Project Section <---------------
  // get all projects
  @Get('allProjects')
  allProjects(): object {
    return this.adminService.allProjects();
  }
  // create project
  @Post('create/project')
  createProject(@Body() project: projectDto): object {
    return this.adminService.createProject(project);
  }

  // Update project info
  @Patch('projects/update/:id')
  updateProjectInfo(
    @Param('id') id: string,
    @Body() data: Partial<projectDto>,
  ): object {
    return this.adminService.updateProjectInfo(id, data);
  }
  // Delete Projects
  @Delete('project/delete/:id')
  deleteProject(@Param('id') id: string): object {
    return this.adminService.deleteProject(id);
  }
}
