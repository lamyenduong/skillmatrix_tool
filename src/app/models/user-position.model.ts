import { Project } from "./project.model"
import { Team } from "./team.model"
import { User } from "./user.model"

export interface UserPosition {
    user_position_id: string
    user: User
    project: Project
    team: Team
}