import { User } from "./user.model"

export interface Form {
    formID: string
    formName: string
    create_date: string
    form_deadline: string
    form_description: string
    user: User
}