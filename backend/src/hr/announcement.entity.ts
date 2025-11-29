import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeInfo } from "./employee.entity";

@Entity()
export class AnnouncementInfo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    subject:string;

    @Column()
    message:string;

    

    @ManyToOne(()=>EmployeeInfo,hrInfo=>hrInfo.announcementInfo,{cascade: true,onDelete: 'CASCADE'})
    hrInfo:EmployeeInfo;

}