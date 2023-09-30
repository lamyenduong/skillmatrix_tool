import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from '../services/navbar-service.service';
import { UserService } from '../services/user/user-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service.service';
import { User } from '../models/user.model';

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
  user: User = {
    full_name: '',
    password: '',
    gender: '',
    phone_number: '',
    birthday: '',
    email: '',
    status: '',
    role: '',
    create_date: '',
    avatar: '',
    user_id: ''
  }
  selectedValue: any

  constructor(private formbuilder: FormBuilder,
    public navbarService: NavbarService,
    private messageService: MessageService, private router: Router,
    private authService: AuthService) {
    this.navbarService.hide();
  }

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

  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      }
    });
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
        () => {
          this.router.navigate(['/']);
          this.navbarService.display();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed!' });
        }
      )
    } else {
      this.markFormControlsAsTouched(this.loginForm);
    }
  }

  registerUserSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.user).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration successful!' });
          this.isLoginForm = true;
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Registration failed!' });
        }
      )
    } else {
      this.markFormControlsAsTouched(this.registerForm);
    }
  }
}
