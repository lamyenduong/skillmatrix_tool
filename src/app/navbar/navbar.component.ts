import { MenuItem } from 'primeng/api';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationService } from '../services/notification-service.service';
import { Notification } from '../models/notification.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  notifications!: Notification[]
  profileTagItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user'
    }, {
      label: 'Settings',
      icon: 'pi pi-cog'
    }
  ]

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getAllNotifications().then(notifications => this.notifications = notifications);
  }
  closeNotification() {
    const notiCount = document.querySelector('#notiCount') as HTMLSpanElement
    notiCount.style.display = "none";
  }
}
