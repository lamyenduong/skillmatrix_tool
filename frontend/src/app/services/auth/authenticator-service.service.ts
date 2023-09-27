import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticatorService {
    private apiUrl = environment.apiUrl
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
    constructor(private http: HttpClient) {
        this.checkToken();
    }
    register(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap((response) => {
                if (response.accessToken) {
                    localStorage.setItem('access_token', response.accessToken);
                    localStorage.setItem('refresh_token', response.refreshToken);
                    this.isAuthenticatedSubject.next(true);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.isAuthenticatedSubject.next(false);
    }

    refreshToken(): Observable<any> {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            return throwError('No refresh token available');
        }
        return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
            tap((response) => {
                if (response.accessToken) {
                    localStorage.setItem('access_token', response.accessToken);
                }
            })
        );
    }

    private checkToken() {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            this.isAuthenticatedSubject.next(true);
        }
    }

    isLoggedIn(): boolean {
        return this.isAuthenticatedSubject.value;
    }
}