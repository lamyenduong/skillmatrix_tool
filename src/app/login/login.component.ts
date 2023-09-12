import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
    this.registerForm = this.formbuilder.group({
      fname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required,]],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
    });
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
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
