import { Form } from "./form.model"
import { Skill } from "./skill.model"

export interface FormSkill {
    formSkillId: number
    form: Form
    skill: Skill
}