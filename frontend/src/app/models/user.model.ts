import { Team } from "./team.model"

export interface User {
    user_id: string,
    password: string
    full_name: string
    gender: string
    phone_number: string
    birthday: string
    email: string
    status: string
    role: string
    create_date: string
    avatar: string
    team?: Team
}