
export enum ProjectStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
}

export class ProjectCreateDTO{
    title:string
    description?:string
    startDate:string
    endDate:string
    status?:ProjectStatus = ProjectStatus.PLANNED
    teamId:[]
    clientName?:string
}