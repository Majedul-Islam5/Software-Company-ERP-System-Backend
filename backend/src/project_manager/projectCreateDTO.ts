import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export enum ProjectStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
}

export class ProjectCreateDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message:
      'Title should only contain alphabets no number or special character',
  })
  title: string;
  @IsString()
  @IsNotEmpty()
  description?: string;
  @IsNotEmpty()
  @IsDateString({}, { message: 'Start date must be valid date format' })
  startDate: string;
  @IsNotEmpty()
  @IsDateString({}, { message: 'End date must be valid date format' })
  endDate: string;
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus = ProjectStatus.PLANNED;
  @IsArray({ message: 'Team Id should be an array' })
  @IsNotEmpty()
  teamId: string[];
  @IsString()
  @IsOptional()
  clientName?: string;
}
