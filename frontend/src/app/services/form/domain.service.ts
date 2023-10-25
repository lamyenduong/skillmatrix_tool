import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Domain } from '../../models/domain.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getAllSkillDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(`${this.apiUrl}/domains`)
  }

  getDomainById(domain_id: string): Observable<Domain> {
    return this.http.get<Domain>(`${this.apiUrl}/domains/${domain_id}`)
  }

  createDomain(domain: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-domain`, domain)
  }
}
