import { IsDateString, isDateString,IsInt,IsOptional, IsString, Matches, MinLength } from "class-validator";




export class UpdateProfileDTO{
     @IsString()
      @IsOptional()
      @Matches(/^[A-Za-z]+$/, {
        message:
          'Name should only contain alphabets no number or special character',
      })
    name?:string;
    @IsString()
    @IsOptional()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/[a-z]+/, {
    message: 'Password must contain at least one lowercase letter',
    })
    password?:string;
     @IsString()
     @IsOptional()
  @Matches(/^01\d*$/, {
    message: 'Phone number must start with 01',
  })
    phoneNumber?:string
}