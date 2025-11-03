import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HrModule } from './hr/hr.module';
import { ProjectManagerController } from './project_manager/projectManager.controller';
import { ProjectManagerModule } from './project_manager/projectManager.module';
import { ProjectManagerService } from './project_manager/projectManager.service';


@Module({
  imports: [HrModule,ProjectManagerModule],
  controllers: [AppController,ProjectManagerController],
  providers: [AppService,ProjectManagerService],
})
export class AppModule {}
