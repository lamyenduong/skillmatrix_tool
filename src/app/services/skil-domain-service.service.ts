import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillDomain } from '../models/skill-domain.model';

@Injectable({
    providedIn: 'root'
})
export class SkillDomainService {

    constructor(private http: HttpClient) { }

    getAllSkillDomains() {
        return this.http.get<any>('assets/data/skill-domain.json')
            .toPromise()
            .then(res => {
                console.log('Response:', res);
                return <SkillDomain[]>res;
            })
            .catch(error => {
                console.error('An error occurred:', error);
                throw error;
            });
    }
}
