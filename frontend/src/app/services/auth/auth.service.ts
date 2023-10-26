import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from '../cookie.service';
import { User } from '../../models/user.model'
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(true);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  public currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private tokenService: TokenService) {
    this.checkToken();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        if (response.accessToken && response.user && response.refreshToken) {
          this.tokenService.setAccessToken(response.accessToken);
          this.tokenService.setRefreshToken(response.refreshToken);
          this.cookieService.setCookie('user_id', response.user.user_id, 1);
          this.isAuthenticatedSubject.next(true);
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
            team: response.user.team,
            avatar: response.user.avatar
          }
          this.currentUserSubject.next(currentUser)
        }
      })
    );
  }

  logout() {
    this.tokenService.clearTokens();
    this.cookieService.removeCookie('user_id');
    this.isAuthenticatedSubject.next(false);
    window.location.reload();
    this.router.navigate(['/login']);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  private checkToken() {
    this.tokenService.checkAccessToken().subscribe((isValid) => {
      if (isValid) {
        this.isAuthenticatedSubject.next(true);
      } else {
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}