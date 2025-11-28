import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./userInfo.dto";
import { EmployeeInfo } from "./employee.entity";

@Entity()
export class BoardingCheckList{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:false})
    laptopAssigned:boolean;

    @Column({default:false})
    idCardIssued:boolean;

    @Column({default:false})
    ndaSigned:boolean;

    @Column({default:false})
    accountCreated:boolean;

    @Column({default:false})
    toolsAccessGiven?:boolean;

    @OneToOne(()=>EmployeeInfo,employeeInfo=>employeeInfo.boardingCheckList,{cascade: true,onDelete: 'CASCADE'})
    @JoinColumn({name:"employee_id"})
    employeeInfo:EmployeeInfo;
}