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
    host:process.env.DB_HOST,
    port:6543,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,

    ssl: {rejectUnauthorized: false,},

    autoLoadEntities:true,
    synchronize:false,
    retryAttempts: 3,
    retryDelay: 3000,
    extra: {
    connectionTimeoutMillis: 5000,
  },
  }
),],
  controllers: [AppController, ProjectManagerController],
  providers: [AppService, ProjectManagerService],
})

export class AppModule {}
