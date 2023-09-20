import { FormSkill } from './../models/form-skill.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FormSkillService {
    private apiUrl = environment.apiUrl
    constructor(private http: HttpClient) { }

    getAllFormSkill() {
        return this.http.get<FormSkill>(`${this.apiUrl}/form-skill`)
    }
    getFormSkillByFormId(form_id: string) {
        return this.http.get<FormSkill>(`${this.apiUrl}/form-skill/${form_id}`)
    }
}
