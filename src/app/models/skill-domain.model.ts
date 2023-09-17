import { Project } from "./project.model"

export interface SkillDomain {
    domainId: number
    domainName: string
    project: Project
    status: string
}