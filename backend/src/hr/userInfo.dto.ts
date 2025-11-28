import { Transform, Type } from "class-transformer";
import { Contains, IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Length, Matches, Min, MinLength } from "class-validator";

export enum Role {
  Admin = 'admin',
  HR = 'hr',
  Developer='developer',
  Project_Manager='projectmanager'
}

export class userInformation {
    @IsString()
    @IsNotEmpty({ message: 'email cannot be empty' })
    @Contains("nexabyte.tech",{ message: 'email must contain nexabyte.tech domain' })
    email:string;

    @IsString()
    @IsNotEmpty({ message: 'password cannot be empty' })
    @MinLength(6,{message:"password must be atleast of length 6"})
    @Matches(/[A-Z]+/)
    password:string;


    @IsNotEmpty({ message: 'user role cannot be empty' })
    @IsEnum(Role,{ message: 'Invalid user Role' })
    @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value), { toClassOnly: true })
    role:Role;
}