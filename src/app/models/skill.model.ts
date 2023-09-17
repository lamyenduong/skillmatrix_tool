import { SkillDomain } from "./skill-domain.model"

export interface Skill {
    skillId: string
    skillName: string
    skillDomain: SkillDomain
}