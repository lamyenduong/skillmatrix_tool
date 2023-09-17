import { User } from "./user.model"

export interface Form {
    formId: string
    formName: string
    createDate: string
    formDeadline: string
    formDescription: string
    user: User
}