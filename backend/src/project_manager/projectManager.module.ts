import { Module } from '@nestjs/common';
import { ProjectManagerController } from './projectManager.controller';
import { ProjectManagerService } from './projectManager.service';


@Module({
  imports: [],
  controllers: [ProjectManagerController],
  providers: [ProjectManagerService],
})
export class ProjectManagerModule {}


