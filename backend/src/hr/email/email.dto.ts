import { IsNotEmpty, IsString } from 'class-validator';

export class EmailData{

  @IsNotEmpty()
  @IsString()
  to:string;

  @IsNotEmpty()
  @IsString()
  subject:string;

  @IsNotEmpty()
  @IsString()
  message:string;
}

