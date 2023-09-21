import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode'; // Import jwt-decode library
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JWTService {
    private readonly tokenKey = 'access_token'; // Modify this to match your token storage key

    // BehaviorSubject to keep track of the token's expiration state
    private tokenExpiredSubject = new BehaviorSubject<boolean>(false);

    constructor() {
        // Check token expiration when the service is initialized
        this.checkTokenExpiration();
    }

    // Method to set the token in local storage or cookies
    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
        this.checkTokenExpiration();
    }

    // Method to retrieve the token from local storage or cookies
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    // Method to remove the token from local storage or cookies
    removeToken(): void {
        localStorage.removeItem(this.tokenKey);
        this.checkTokenExpiration();
    }

    // Method to check if the token is expired
    isTokenExpired(): boolean {
        const token = this.getToken();
        if (token) {
            const decodedToken: any = jwtDecode(token);
            const expirationDate = decodedToken.exp * 1000; // Convert to milliseconds
            return Date.now() > expirationDate;
        }
        return true; // Token is considered expired if not found
    }

    // Method to get the token expiration status as an observable
    tokenExpiredStatus(): BehaviorSubject<boolean> {
        return this.tokenExpiredSubject;
    }

    // Check token expiration and update the BehaviorSubject
    private checkTokenExpiration(): void {
        this.tokenExpiredSubject.next(this.isTokenExpired());
    }
}
