import { ProjectStatus } from "./projectCreateDTO"


export class ProjectUpdateDTO{
    title?:string
    description?:string
    endDate?:string
    status?: ProjectStatus
    teamId?:[]
    clientName?:string
}