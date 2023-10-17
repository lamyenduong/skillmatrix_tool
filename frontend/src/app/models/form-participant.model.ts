import { Form } from "./form.model"
import { User } from "./user.model"

export interface FormParticipant {
    form_participant_id: string
    user?: User
    form?: Form
}