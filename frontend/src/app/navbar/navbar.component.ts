import { MenuItem } from 'primeng/api';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationService } from '../services/notification-service.service';
import { Notification } from '../models/notification.model';
import { NavbarService } from '../services/navbar-service.service';
import { AuthService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { CookieService } from '../services/cookie-service.service';
import { UserService } from '../services/user/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  notifications!: Notification[]
  currentUser!: User | null

  profileTagItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog'
    },
    {
      label: 'Log out',
      icon: 'pi pi-sign-out',
      command: () => {
        this.authService.logout();
      }
    }
  ]

  constructor(private notificationService: NotificationService,
    public navbarService: NavbarService, public authService: AuthService,
    private cookieService: CookieService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.notificationService.getAllNotifications().then(notifications => this.notifications = notifications);
    this.authService.currentUserSubject.asObservable().subscribe(user => {
      const user_id = this.cookieService.getCookie("user_id")
      this.userService.getUserById(user_id).subscribe(user => this.currentUser = user)
    })
  }

  //Notification
  isNewNotification!: boolean
  closeNotification() {
    const notiCount = document.querySelector('#notiCount') as HTMLSpanElement
    notiCount.style.display = "none";
  }

}
