import { Injectable } from '@nestjs/common';
import userData from './data/users.json';
import projectData from './data/projects.json';
import { userDto } from './Dto/user.dto';
import { projectDto } from './Dto/project.dto';
@Injectable()
export class adminService {
  // ----------------> Admin Profile <------------

  // See admin Profile
  adminProfile(id: string): object {
    const ID = Number(id);
    const selectedUser = userData.find((item) => item.uid === ID);
    if (selectedUser) {
      return selectedUser;
    } else {
      return { message: 'No User Found !' };
    }
  }
  // update admin profile
  updateAdminProfile(id: string, info: Partial<userDto>): object {
    const ID = Number(id);
    const selectedUser = userData.find((item) => item.uid === ID);
    if (selectedUser) {
      // I have to add DB logics here
      return {
        message: 'Information Updated',
        ReceivedData: info,
        data: selectedUser,
      };
    } else {
      return { message: 'No user Found' };
    }
  }

  // -------------> Project Section <------------------

  // get all projects
  allProjects(): object {
    return projectData;
  }

  // update Project Info
  updateProjectInfo(p_Id: string, projectInfo: Partial<projectDto>): object {
    const selectedProject = projectData.find(
      (item) => item.project_id === p_Id,
    );
    if (selectedProject) {
      // I have to add DB logics here
      return {
        message: 'Information Updated',
        ReceivedData: projectInfo,
        data: selectedProject,
      };
    } else {
      return { message: 'No user Found' };
    }
  }

  // create project
  createProject(project: projectDto): object {
    //   i have to add further logics later
    return {
      message: 'Project Created Successfully',
      data: project,
    };
  }

  // Delete Project
  deleteProject(id: string): object {
    const selectedProject = projectData.find((item) => item.project_id === id);
    if (selectedProject) {
      // DB Logics here
      return {
        message: 'Project Deleted !',
        data: selectedProject,
      };
    } else {
      return {
        message: 'Project Not Found',
      };
    }
  }

  //------------> users Section <--------------------

  // see all user
  allUsers(): object {
    return userData;
  }
  // Add User
  addUser(user: userDto): object {
    //   i have to add further logics later
    return {
      message: 'User Added Successfully',
      data: user,
    };
  }
  // Delete User
  deleteUser(id: string): object {
    const ID = Number(id);
    const selectedUser = userData.find((item) => item.uid === ID);
    if (selectedUser) {
      // DB Logics here
      return {
        message: 'User Deleted !',
        data: selectedUser,
      };
    } else {
      return {
        message: 'User Not Found',
      };
    }
  }
  // Get User by role
  getUsersByRole(Role: string): object {
    // return { Role };
    const selectedUsers = userData.filter((item) => item.role === Role);
    if (selectedUsers) {
      return selectedUsers;
    } else {
      return { message: 'No User Found !' };
    }
  }
}
