import { IsEnum, IsNotEmpty } from "class-validator";
import { ProjectStatus } from "./projectCreateDTO";


export class ProjectUpdateStatusDTO{
    @IsNotEmpty()
    @IsEnum(ProjectStatus)
    status: ProjectStatus
}