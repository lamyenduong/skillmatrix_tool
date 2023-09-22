import { Form } from "./form.model"
import { Skill } from "./skill.model"

export interface FormSkill {
    form_skill_id: string
    form: Form
    skill: Skill
}