import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getAllNotifications() {
    return this.http.get<any>('assets/data/notification.json')
      .toPromise()
      .then(res => {
        console.log('Response:', res);
        return <Notification[]>res;
      })
      .catch(error => {
        console.error('An error occurred:', error);
        throw error;
      });
  }
}
