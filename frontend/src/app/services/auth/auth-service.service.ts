import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from '../cookie-service.service';
import { User } from 'src/app/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
    public currentUserSubject = new BehaviorSubject<User | null>(null);
    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.checkToken();
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap((response) => {
                if (response.accessToken && response.user && response.refreshToken) {
                    localStorage.setItem('access_token', response.accessToken);
                    localStorage.setItem('refresh_token', response.refreshToken);
                    localStorage.setItem('user_id', response.user.user_id);
                    sessionStorage.setItem('access_token', response.accessToken);
                    sessionStorage.setItem('refresh_token', response.refreshToken);
                    sessionStorage.setItem('user_id', response.user.user_id)
                    this.cookieService.setCookie('access_token', response.accessToken, 1)
                    this.cookieService.setCookie('refresh_token', response.refreshToken, 1)
                    this.cookieService.setCookie('user_id', response.user.user_id, 1);
                    const currentUser: User = {
                        user_id: response.user.user_id,
                        password: response.user.password,
                        full_name: response.user.full_name,
                        gender: response.user.gender,
                        phone_number: response.user.phone_number,
                        birthday: response.user.birthday,
                        email: response.user.email,
                        status: response.user.status,
                        role: response.user.role,
                        create_date: response.user.create_date,
                        avatar: response.user.avatar
                    }
                    this.currentUserSubject.next(currentUser)
                    this.isAuthenticatedSubject.next(true);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('user_id')
        this.cookieService.removeCookie('access_token')
        this.cookieService.removeCookie('refresh_token')
        this.cookieService.removeCookie('user_id');
        this.isAuthenticatedSubject.next(false);
    }

    register(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    refreshToken(): Observable<any> {
        const refreshToken = localStorage.getItem('refresh_token');
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