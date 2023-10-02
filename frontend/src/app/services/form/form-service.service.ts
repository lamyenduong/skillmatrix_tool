import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '../../models/form.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getFormById(form_id: string): Observable<Form> {
    return this.http.get<Form>(`${this.apiUrl}/forms/${form_id}`)
  }
  createFormByUpload(dataArray: any[][]): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-form`, { data: dataArray });
  }
  getFormOwner(user_id: string): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.apiUrl}/forms/owner/${user_id}`)
  }
  getFormParticipants(form_id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/forms/participants/${form_id}`)
  }
  createForm(form: Form): Observable<Form> {
    return this.http.post<Form>(`${this.apiUrl}/create-form`, form)
  }
}
