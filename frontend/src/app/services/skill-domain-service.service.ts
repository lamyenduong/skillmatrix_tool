import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillDomain } from '../models/skill-domain.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SkillDomainService {
    private apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    getAllSkillDomains() {
        return this.http.get<SkillDomain[]>(`${this.apiUrl}/domains`)
    }
}
