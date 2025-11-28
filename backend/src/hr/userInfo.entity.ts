import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./userInfo.dto";
import { EmployeeInfo } from "./employee.entity";

@Entity()
export class userCredentials{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",length:100})
    email:string;

    @Column()
    password:string;

    @Column({type:"enum",enum:Role})
    role:Role;

    @OneToOne(()=>EmployeeInfo,employeeInfo=>employeeInfo.usercredent,{cascade: true,onDelete: 'CASCADE'})
    @JoinColumn({name:"employee_id"})
    employeeInfo:EmployeeInfo;

}