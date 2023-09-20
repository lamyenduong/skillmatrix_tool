import { Project } from "./project.model"

export interface SkillDomain {
    domain_id: string
    domain_name: string
    project: Project
    status: string
}