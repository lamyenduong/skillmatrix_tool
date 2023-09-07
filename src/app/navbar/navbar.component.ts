import { MenuItem } from 'primeng/api';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Notification } from '../models/notification.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  profileTagItems!: MenuItem[]
  notifications!: Notification[]
  notificationItem!: MenuItem[]

  constructor() { }

  ngOnInit(): void {
    this.profileTagItems = [{
      label: 'Profile',
      icon: 'pi pi-user'
    }, {
      label: 'Settings',
      icon: 'pi pi-cog'
    }]

    this.notifications = [
      {
        avatar: '',
        message: 'Lorem ipsum dolor sit amet, consectetur adip incididunt',
        createAt: '1 days ago'
      },
      {
        avatar: '',
        message: 'Lorem ipsum dolor sit amet, consectetur adip incididunt',
        createAt: '1 days ago'
      }
    ];


    this.notificationItem = this.notifications.map(notification => ({
      icon: notification.avatar,
      label: {
        template: `
          <div class="noti__content">
            <p class="noti__message">${notification.message}</p>
            <p class="noti__time">${notification.createAt}</p>
          </div>
        `
      },
      escape: false // Allow HTML in the label
    }));
  }


}
