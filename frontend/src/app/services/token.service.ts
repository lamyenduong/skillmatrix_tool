import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = environment.apiUrl
  private accessTokenSubject: BehaviorSubject<string | null>;
  public accessToken$: Observable<string | null>;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient) {
    const initialAccessToken = this.cookieService.getCookie('accesstoken');
    this.accessTokenSubject = new BehaviorSubject<string | null>(initialAccessToken);
    this.accessToken$ = this.accessTokenSubject.asObservable();
  }

  getAccessToken(): string | null {
    return this.accessTokenSubject.value;
  }

  setAccessToken(token: string): void {
    this.cookieService.setCookie('accesstoken', token, 1);
    this.accessTokenSubject.next(token);
  }

  getRefreshToken(): string | null {
    return this.cookieService.getCookie('refreshtoken');
  }

  setRefreshToken(token: string): void {
    this.cookieService.setCookie('refreshtoken', token, 30);
  }

  clearTokens(): void {
    this.cookieService.removeCookie('accesstoken');
    this.cookieService.removeCookie('refreshtoken');
    this.accessTokenSubject.next(null);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap((response) => {
        if (response.accessToken) {
          this.setAccessToken(response.accessToken);
        }
      })
    );
  }

  checkAccessToken(): Observable<boolean> {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      return this.http.post<boolean>(`${this.apiUrl}/access-token`, { accessToken });
    }
    return of(false);
  }
}
