import { Project } from "./project.model"

export interface SkillDomain {
    domain_id: number
    domain_name: string
    project: Project
    status: string
}