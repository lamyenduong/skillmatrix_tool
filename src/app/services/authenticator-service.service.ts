import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user-service.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticatorService {

    constructor(private http: HttpClient, private userService: UserService) {
    }
    login(username: string, password: string) {

    }
    logout() {
    }
}
