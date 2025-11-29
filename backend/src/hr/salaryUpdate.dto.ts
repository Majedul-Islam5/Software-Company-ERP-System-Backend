import { Transform, Type } from "class-transformer";
import { Contains, IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, Max, Min, MinLength } from "class-validator";
import { Month } from "./salary.dto";

export class empSalaryUpdate{

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  houseRent?:number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  medicalAllowance?:number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  transportAllowance?:number;

  
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  overtimePayment?:number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  taxDeduction?:number;

  @IsNotEmpty({ message: 'Month cannot be empty' })
  @IsEnum(Month,{ message: 'Invalid Month' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value), { toClassOnly: true })
  @IsOptional()
  month?:Month;  

  @IsNumber()
  @Min(2000)
  @Max(2100)
  @Type(() => Number)
  @IsOptional()
  year?:number; 
}
