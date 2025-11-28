import { Transform, Type } from "class-transformer";
import { Contains, IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Length, Matches, Min, MinLength } from "class-validator";

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum Status {
  Active = 'active',
  InActive = 'inactive',
}

export class employeeData{

    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty' })
    fullname:string;


    @IsString()
    @IsNotEmpty({ message: 'email cannot be empty' })
    @Contains("nexabyte.tech",{ message: 'email must contain nexabyte.tech domain' })
    email:string;

    @IsNotEmpty({ message: 'gender cannot be empty' })
    @IsEnum(Gender,{ message: 'Invalid Gender' })
    @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value), { toClassOnly: true })
    gender:Gender;

    @IsNotEmpty({ message: 'Status cannot be empty' })
    @IsEnum(Status,{ message: 'Invalid Status' })
    @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value), { toClassOnly: true })
    status:Status;

    @IsNotEmpty({ message: 'joining date cannot be empty' })
    @IsDate()
    @Type(() => Date)
    joindate:Date;

    @IsNumber()
    @IsNotEmpty({ message: 'salary cannot be empty' })
    @Min(0)
    salary:number;

    @IsNumber()
    @IsNotEmpty({ message: 'salary cannot be empty' })
    @Min(0)
    age:number;


    @IsString()
    @Matches(/^[0-9]+$/,{ message: 'phone number can contain digits only' })
    @Length(11,11,{ message: 'phone number can contain 11 digits only' })
    @IsNotEmpty({ message: 'phone number cannot be empty' })
    phone:string;
}