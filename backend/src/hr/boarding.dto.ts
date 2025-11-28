import { IsBoolean, IsOptional } from "class-validator";

export class BoardingCheck{
    
    @IsBoolean()
    @IsOptional()
    laptopAssigned?:boolean;


    @IsBoolean()
    @IsOptional()
    idCardIssued?:boolean;


    @IsBoolean()
    @IsOptional()
    ndaSigned?:boolean;


    @IsBoolean()
    @IsOptional()
    accountCreated?:boolean;


    @IsBoolean()
    @IsOptional()
    toolsAccessGiven?:boolean;
}
