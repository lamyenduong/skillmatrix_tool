import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }

  getUserById(user_id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${user_id}`)
  }

  getUserByEmail(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/email`)
  }

  getUserInTeam(team_id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/team/${team_id}`)
  }

  getUserByName(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/full-name`)
  }

  updateUser(user_id: string, user: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/user/profile/${user_id}`, user_id, user)
  }
}