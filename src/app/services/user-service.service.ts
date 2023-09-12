import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any>('assets/data/user.json')
      .toPromise()
      .then(res => {
        console.log('Response:', res);
        return <User[]>res;
      })
      .catch(error => {
        console.error('An error occurred:', error);
        throw error;
      });
  }
}
