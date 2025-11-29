import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "./userInfo.dto";
import { EmployeeInfo } from "./employee.entity";
import { Month } from "./salary.dto";

@Entity()
@Unique(['month','year']) 
export class SalaryInfo{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    basicsalary:number;
    
    @Column()
    houseRent:number;
    
    @Column()
    medicalAllowance:number;
    
    @Column()
    transportAllowance:number;
    
    @Column({default:0})
    overtimePayment:number;
    
    @Column()
    taxDeduction:number;
    
    @Column()
    totalSalary:number;
    
    @Column({type:"enum",enum:Month})
    month:Month; 
    
    @Column()
    year:number; 

    @ManyToOne(()=>EmployeeInfo,employeeInfo=>employeeInfo.salaryInfo,{cascade: true,onDelete: 'CASCADE'})
    employeeInfo:EmployeeInfo;
}