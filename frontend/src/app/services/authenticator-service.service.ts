import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap((response) => {
                if (response.token) {
                    localStorage.setItem('access_token', response.token);
                    this.isAuthenticatedSubject.next(true);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem('access_token');
        this.isAuthenticatedSubject.next(false);
    }

    checkToken() {
        const token = localStorage.getItem('access_token');
        if (token) {
            this.isAuthenticatedSubject.next(true);
        }
    }

    isLoggedIn(): boolean {
        return this.isAuthenticatedSubject.value;
    }
}