import { Domain } from "./domain.model"
import { Form } from "./form.model"

export interface FormSkill {
    form_skill_id: string
    form?: Form
    domain?: Domain
}