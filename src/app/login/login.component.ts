import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavbarService } from '../services/navbar-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  hide = true;
  cfhide = true;
  isLoginForm = true;
  registerForm!: FormGroup;
  loginForm!: FormGroup;

  selectedValue: any

  constructor(private formbuilder: FormBuilder, public navbarService: NavbarService) { }

  ngOnInit(): void {
  }

  //Max attribute for date input 
  calculateMaxDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month.toString();
    const formattedDay = day < 10 ? `0${day}` : day.toString();
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
}
