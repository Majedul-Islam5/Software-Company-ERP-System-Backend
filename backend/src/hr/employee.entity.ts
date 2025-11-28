import { BeforeInsert, Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Gender, Status } from "./employee.dto";
import { userCredentials } from "./userInfo.entity";

@Entity()
export class EmployeeInfo{

    @PrimaryColumn({type:"integer",unsigned:true})
    id:number;

    @Column({type:"varchar",length:100})
    fullname:string;
    
    @Column()
    email:string;

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

    @Column()
    userImage:string;

    @BeforeInsert()
    customId():void{
        let id:number;
        id=Math.floor(10000+Math.random()*90000); 
        this.id=id;
    }
    @OneToOne(()=>userCredentials,usercredent=>usercredent.employeeInfo)
    usercredent:userCredentials;
}