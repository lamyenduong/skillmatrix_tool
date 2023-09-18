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
    return this.http.get<Form[]>(`${this.apiUrl}/forms`)
  }

  getFormById(formId: string) {
    return this.http.get<Form[]>(`${this.apiUrl}/forms/${formId}`)
  }
}
