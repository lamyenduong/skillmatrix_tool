import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '../models/form.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllForms() {
    const url = `${this.apiUrl}`;
    return this.http.get<Form[]>(url)
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
  getFormById(formID: string) {
    const url = `${this.apiUrl}/forms/${formID}`;
    return this.http.get<Form[]>(url)
      .toPromise()
      .then(res => {
        console.log('Response:', res);
        return res;
      })
      .catch(error => {
        console.error('An error occurred:', error);
        throw error;
      });
  }

}
