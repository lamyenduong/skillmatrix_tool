import { SkillDomain } from './../../models/skill-domain.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../../models/skill.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SkillService {
    private apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    getAllSkills(): Observable<Skill[]> {
        return this.http.get<Skill[]>(`${this.apiUrl}/skills/`)
    }


    getSkillInDomain(domain_id: string): Observable<Skill[]> {
        return this.http.get<Skill[]>(`${this.apiUrl}/skills/${domain_id}`)
    }
}
