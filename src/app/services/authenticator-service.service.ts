import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user-service.service';
import { tap } from 'rxjs/operators'; // Import tap operator for side effects
import { JWTService } from './jwt-service.service'; // Import your JWT service

@Injectable({
    providedIn: 'root'
})
export class AuthenticatorService {
    private readonly loginUrl = 'http://your-api-url/login'; // Replace with your login endpoint
    private readonly logoutUrl = 'http://your-api-url/logout'; // Replace with your logout endpoint

    constructor(
        private http: HttpClient,
        private userService: UserService,
        private jwtService: JWTService // Inject your JWT service
    ) { }

    login(username: string, password: string) {
        // Send a POST request to the login endpoint with credentials
        return this.http
            .post(this.loginUrl, { username, password })
            .pipe(
                tap((response: any) => {
                    // Assuming your server returns an access token upon successful login
                    const { accessToken } = response;

                    if (accessToken) {
                        // Set the access token in your JWT service
                        this.jwtService.setToken(accessToken);

                        // You can also retrieve user data and store it in your UserService
                        // This depends on your server's response structure
                        this.userService.setUser(response.user);

                        // Handle any additional login logic here, such as route redirection
                    }
                })
            );
    }

    logout() {
        // Send a POST request to the logout endpoint (if needed)
        // Clear the user data in your UserService
        this.userService.clearUser();

        // Remove the access token from your JWT service
        this.jwtService.removeToken();

        // Handle any additional logout logic here, such as route redirection
    }
}
