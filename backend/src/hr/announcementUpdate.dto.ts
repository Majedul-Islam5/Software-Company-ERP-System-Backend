import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class announcementUpdate{
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  subject?:string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  message?:string;
}

