import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getForms() {
    return this.http.get<any>('assets/form.json')
      .toPromise()
      .then(res => {
        console.log('Response:', res);
        return <Form[]>res;
      })
      .catch(error => {
        console.error('An error occurred:', error);
        throw error;
      });
  }

}
