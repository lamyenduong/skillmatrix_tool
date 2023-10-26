import { CookieService } from './../cookie.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenService } from '../token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            console.log(this.authService.isLoggedIn())
            return true;
        } else {
            console.log(this.authService.isLoggedIn())
            this.router.navigate(['/login']);
            return false;
        }
    }
}
