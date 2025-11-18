import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Gender, Status } from "./employee.dto";

@Entity()
export class EmployeeInfo{

    @PrimaryColumn({type:"integer",unsigned:true})
    id:number;

    @Column({type:"varchar",length:100})
    fullname:string;

    @Column()
    password:string;
    
    @Column()
    email:string;

    @Column()
    role:string;

    @Column({type:"enum",enum:Gender})
    gender:Gender;

    @Column({type:"enum",enum:Status,default:Status.Active})
    status:Status;

    @Column()
    joindate:Date;

    @Column()
    salary:number;

    @Column({type:"integer",unsigned:true})
    age:number;
    
    @Column()
    phone:string;
    
}