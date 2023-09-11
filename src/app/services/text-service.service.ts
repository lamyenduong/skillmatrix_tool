import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TextService {

    constructor(private http: HttpClient) { }

    getAllTexts(): Observable<any> {
        return this.http.get('assets/data/text.json');
    }
}