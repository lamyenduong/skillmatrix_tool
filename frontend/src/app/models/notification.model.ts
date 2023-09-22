import { User } from "./user.model"

export interface Notification {
    noti_id: string
    user: User
    message: string
    create_at: string
}
