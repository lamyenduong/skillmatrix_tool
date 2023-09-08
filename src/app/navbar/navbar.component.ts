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

  constructor() { }

  ngOnInit(): void {
    this.profileTagItems = [{
      label: 'Profile',
      icon: 'pi pi-user'
    }, {
      label: 'Settings',
      icon: 'pi pi-cog'
    }]
  }


}
