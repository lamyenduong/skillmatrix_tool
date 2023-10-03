import { User } from "./user.model"

export interface Form {
    form_id: string
    form_name: string
    create_date: string
    form_deadline: string
    form_description: string
    user?: User
}