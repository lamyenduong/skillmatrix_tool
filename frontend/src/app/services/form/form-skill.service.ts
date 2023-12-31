import { FormSkill } from '../../models/form-skill.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormSkillService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllFormSkill() {
    return this.http.get<FormSkill>(`${this.apiUrl}/form-skill`)
  }

  createFormSkill(fs: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-formskill`, fs)
  }
}
