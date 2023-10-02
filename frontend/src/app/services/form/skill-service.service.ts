import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../../models/skill.model';

@Injectable({
    providedIn: 'root'
})
export class SkillService {

    constructor(private http: HttpClient) { }

    getAllSkills() {
        return this.http.get<any>('assets/data/skill.json')
            .toPromise()
            .then(res => {
                console.log('Response:', res);
                return <Skill[]>res;
            })
            .catch(error => {
                console.error('An error occurred:', error);
                throw error;
            });
    }


}
