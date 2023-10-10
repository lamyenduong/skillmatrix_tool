import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }

  getUserById(user_id: string) {
    return this.http.get<User>(`${this.apiUrl}/users/${user_id}`)
  }

  getUserByEmail() {
    return this.http.get<User[]>(`${this.apiUrl}/users/email`)
  }

  getUserByName() {
    return this.http.get<User[]>(`${this.apiUrl}/users/full-name`)
  }

  updateUser(user_id: string, user: any) {
    return this.http.patch<any>(`${this.apiUrl}/user/profile/${user_id}`, user_id, user)
  }
}
