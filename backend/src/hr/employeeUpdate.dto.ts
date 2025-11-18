import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from "class-validator";
import { Gender, Status } from "./employee.dto";
import { Transform, Type } from "class-transformer";
export class employeeUpdate{

    @IsNumber()
    @IsNotEmpty({ message: 'id cannot be empty' })
    @IsOptional()
    id:number;

    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsOptional()
    fullname?:string;

    @IsString()
    @IsNotEmpty({ message: 'password cannot be empty' })
    @IsOptional()
    password?:string;

    @IsString()
    @IsNotEmpty({ message: 'email cannot be empty' })
    @IsOptional()
    email?:string;

    @IsString()
    @IsNotEmpty({ message: 'user role cannot be empty' })
    @IsOptional()
    role?:string;

    @IsNotEmpty({ message: 'gender cannot be empty' })
    @IsEnum(Gender,{ message: 'Gender must be either Male or Female' })
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value), { toClassOnly: true })
    gender?:string;

    @IsNotEmpty({ message: 'Status cannot be empty' })
    @IsEnum(Status,{ message: 'Invalid Status' })
    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value), { toClassOnly: true })
    status?:Status;

    @IsNotEmpty({ message: 'joining date cannot be empty' })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    joindate?:Date;

    @IsNumber()
    @IsOptional()
    salary?:number;

    @IsNumber()
    @IsOptional()
    age?:number;

    @IsString()
    @Matches(/^[0-9]+$/)
    @Length(11)
    @IsOptional()
    @IsNotEmpty({ message: 'phone number cannot be empty' })
    phone?:string;

}