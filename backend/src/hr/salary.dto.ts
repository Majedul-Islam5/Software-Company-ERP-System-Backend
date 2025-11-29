import { Transform, Type } from "class-transformer";
import { Contains, IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, Max, Min, MinLength } from "class-validator";

export enum Month {
  JANUARY = "january",
  FEBRUARY = "february",
  MARCH = "march",
  APRIL = "april",
  MAY = "may",
  JUNE = "june",
  JULY = "july",
  AUGUST = "august",
  SEPTEMBER = "september",
  OCTOBER = "october",
  NOVEMBER = "november",
  DECEMBER = "december",
}


export class empSalary{
  /*@IsNumber()
  @Min(0)
  basicsalary:number;*/

  @IsNumber()
  @Min(0)
  houseRent:number;

  @IsNumber()
  @Min(0)
  medicalAllowance:number;

  @IsNumber()
  @Min(0)
  transportAllowance:number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  overtimePayment?:number;

  @IsNumber()
  @Min(0)
  taxDeduction:number;

  /*@IsNumber()
  @Min(0)
  totalSalary:number;*/

  @IsNotEmpty({ message: 'Month cannot be empty' })
  @IsEnum(Month,{ message: 'Invalid Month' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value), { toClassOnly: true })
  month:Month;  

  @IsNumber()
  @Min(2000)
  @Max(2100)
  year:number; 
}
