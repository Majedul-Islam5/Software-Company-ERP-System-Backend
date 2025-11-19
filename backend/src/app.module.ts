import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HrModule } from './hr/hr.module';
import { ProjectManagerController } from './project_manager/projectManager.controller';
import { ProjectManagerModule } from './project_manager/projectManager.module';
import { ProjectManagerService } from './project_manager/projectManager.service';
import { adminModule } from './Admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }), HrModule, ProjectManagerModule, adminModule,TypeOrmModule.forRoot(
  { type:'postgres',
    host:'localhost',
    port:5432,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    autoLoadEntities:true,
    synchronize:true,
  }
),],
  controllers: [AppController, ProjectManagerController],
  providers: [AppService, ProjectManagerService],
})

export class AppModule {}
