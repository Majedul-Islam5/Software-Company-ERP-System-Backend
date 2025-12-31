import { Transform, Type } from "class-transformer";
import { Contains, IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, Min, MinLength } from "class-validator";
import { Role } from "./userInfo.dto";


export class userInformationUpdate {
    @IsString()
    @IsNotEmpty({ message: 'email cannot be empty' })
    @Contains("nexabyte.tech",{ message: 'email must contain nexabyte.tech domain' })
    @IsOptional()
    email?:string;

    @IsString()
    @IsNotEmpty({ message: 'password cannot be empty' })
    @MinLength(6,{message:"password must be atleast of length 6"})
    @Matches(/[A-Z]+/)
    @IsOptional()
    password?:string;


    @IsNotEmpty({ message: 'user role cannot be empty' })
    @IsEnum(Role,{ message: 'Invalid user Role' })
    @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value), { toClassOnly: true })
    @IsOptional()
    role?:Role;
}