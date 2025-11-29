import { IsNotEmpty, IsString } from 'class-validator';

export class announcementData{
  @IsNotEmpty()
  @IsString()
  subject:string;

  @IsNotEmpty()
  @IsString()
  message:string;
}

