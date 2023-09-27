import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserRateService {
    private apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }


}
