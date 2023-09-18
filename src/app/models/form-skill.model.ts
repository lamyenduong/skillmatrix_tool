import { Form } from "./form.model"
import { Skill } from "./skill.model"

export interface FormSkill {
    form_skill_id: number
    form: Form
    skill: Skill
}