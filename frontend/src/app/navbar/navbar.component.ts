import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { NotificationService } from '../services/notification-service.service';
import { NavbarService } from '../services/navbar.service';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { CookieService } from '../services/cookie.service';
import { Notification } from '../models/notification.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  notifications: Notification[] = [];
  currentUser: User | null = null;
  isNewNotification = false;

  profileTagItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        const user_id = this.cookieService.getCookie('user_id');
        this.router.navigate(['/profile', user_id]);
      }
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog'
    },
    {
      label: 'Log out',
      icon: 'pi pi-sign-out',
      command: () => this.authService.logout()
    }
  ];

  constructor(
    private notificationService: NotificationService,
    public navbarService: NavbarService,
    public authService: AuthService,
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadNotifications();
    this.authService.currentUserSubject.asObservable().subscribe(() => {
      this.loadCurrentUser();
    });
  }

  loadNotifications(): void {
    this.notificationService.getAllNotifications().then((notifications) => {
      this.notifications = notifications;
    });
  }

  loadCurrentUser(): void {
    const user_id = this.cookieService.getCookie('user_id');
    this.userService.getUserById(user_id).subscribe((user) => {
      this.currentUser = user;
    });
  }

  closeNotification(): void {
    const notiCount = document.querySelector('#notiCount') as HTMLSpanElement;
    notiCount.style.display = 'none';
  }
}
