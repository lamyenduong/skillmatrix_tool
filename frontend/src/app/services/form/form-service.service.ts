import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '../../models/form.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllForms() {
    return this.http.get<Form[]>(`${this.apiUrl}/forms`)
  }
  getFormById(form_id: string) {
    return this.http.get<Form>(`${this.apiUrl}/forms/${form_id}`)
  }
  createFormByUpload(dataArray: any[][]): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-form`, { data: dataArray });
  }
  getFormOwner(user_id: string) {
    return this.http.get<Form>(`${this.apiUrl}/forms/owner/${user_id}`)
  }
  getFormParticipants(user_id: string) {
    return this.http.get<Form>(`${this.apiUrl}/forms/participants/${user_id}`)
  }
}
