import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { CookieService } from '../../services/cookie.service';
import { TeamService } from '../../services/form/team.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  displayEditInfoButton!: boolean
  teams!: Team[]
  formUpdate!: FormGroup
  currentUser: User = {
    user_id: '',
    password: '',
    full_name: '',
    gender: '',
    phone_number: '',
    birthday: '',
    email: '',
    status: '',
    role: '',
    create_date: '',
    avatar: '',
    team: undefined
  }

  constructor(private userService: UserService,
    private router: ActivatedRoute, private teamService: TeamService,
    private fb: FormBuilder, private messageService: MessageService,
    private cookieService: CookieService,) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const user_id = params.get('user_id');
      if (user_id !== null) {
        this.userService.getUserById(user_id).subscribe((data: User) => {
          if (data) {
            this.currentUser = data;
          } else {
            console.log("No data received.");
          }
        },
          (error) => {
            console.error("Error:", error);
          }
        );
      }
    })
    this.teamService.getAllTeams().subscribe(teams => this.teams = teams)
    this.formUpdate = this.fb.group({
      email: "",
      full_name: "",
      phone_number: "",
      gender: "",
      birthday: "",
      team: "",
    })
  }

  showEditInfoDialog() {
    this.displayEditInfoButton = true
  }

  updateUser() {
    const user_id = this.cookieService.getCookie("user_id")
    if (this.formUpdate.valid) {
      this.userService.updateUser(user_id, this.currentUser).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration successful!' });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Registration failed!' });
        }
      )
    }
  }
}
