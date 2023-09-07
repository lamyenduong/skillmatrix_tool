import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'src/app/models/notification.model';

@Component({
  selector: 'app-card-notification',
  templateUrl: './card-notification.component.html',
  styleUrls: ['./card-notification.component.sass']
})
export class CardNotificationComponent implements OnInit {
  @Input() notification!: Notification;

  constructor() { }

  ngOnInit(): void {
  }

}
