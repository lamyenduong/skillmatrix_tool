import { Form } from "./form.model"
import { Skill } from "./skill.model"
import { User } from "./user.model"

export interface UserRate {
    user_rate_id: string
    user: User
    form: Form
    skill: Skill
    self_rate: number
    manager_rate: number
    user_last_update: string
    manager_last_update: string
}