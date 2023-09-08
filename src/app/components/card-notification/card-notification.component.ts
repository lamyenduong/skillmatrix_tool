import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'src/app/models/notification.model';

@Component({
  selector: 'app-card-notification',
  templateUrl: './card-notification.component.html',
  styleUrls: ['./card-notification.component.sass']
})
export class CardNotificationComponent implements OnInit {
  @Input() notification!: Notification;
  notifications!: Notification[]

  constructor() { }

  ngOnInit(): void {

    this.notifications = [
      {
        avatar: '',
        message: 'Lorem ipsum dolor sit amet, consectetur adip incididunt ut labore et dolore mag et dolore',
        createAt: '1 days ago'
      },
      {
        avatar: '',
        message: 'Lorem ipsum dolor sit amet',
        createAt: '1 days ago'
      }
    ];
  }



}
