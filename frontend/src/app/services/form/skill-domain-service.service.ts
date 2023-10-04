import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillDomain } from '../../models/skill-domain.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SkillDomainService {
    private apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    getAllSkillDomains(): Observable<SkillDomain[]> {
        return this.http.get<SkillDomain[]>(`${this.apiUrl}/domains`)
    }
    getDomainByFormId(form_id: string): Observable<SkillDomain[]> {
        return this.http.get<SkillDomain[]>(`${this.apiUrl}/domains/${form_id}`)
    }
}
