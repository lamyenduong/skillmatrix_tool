import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
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

  registerUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}/users`, user)
  }

  login(email: string) {
    return this.http.post<User>(`${this.apiUrl}/login`, email)
  }

}
