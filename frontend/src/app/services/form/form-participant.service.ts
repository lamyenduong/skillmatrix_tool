import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormParticipant } from 'src/app/models/form-participant.model';

@Injectable({
  providedIn: 'root'
})
export class FormParticipantService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  createFormParticipant(fp: FormParticipant) {
    return this.http.post(`${this.apiUrl}/participants`, fp)
  }
}
