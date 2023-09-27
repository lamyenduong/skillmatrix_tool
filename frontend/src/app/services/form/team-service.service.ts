import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Team } from '../../models/team.model';

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private apiUrl = environment.apiUrl
    constructor(private http: HttpClient) { }

    getAllTeams() {
        return this.http.get<Team[]>(`${this.apiUrl}/teams`)
    }

}
