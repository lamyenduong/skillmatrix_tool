import { SkillDomain } from "./skill-domain.model"

export interface Skill {
    skill_id: string
    skill_name: string
    skill_domain?: SkillDomain
}