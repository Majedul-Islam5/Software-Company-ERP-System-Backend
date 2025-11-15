import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ProjectStatus } from './projectCreateDTO';

export class ProjectUpdateDTO {
  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-z\s]+$/, {
    message:
      'Title should only contain alphabets no number or special character',
  })
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsOptional()
  @IsDateString({}, { message: 'End date must be valid date format' })
  endDate?: string;
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;
  @IsOptional()
  @IsArray({ message: 'Team Id should be an array' })
  teamId?: string[];
  @IsString()
  @IsOptional()
  clientName?: string;
}
