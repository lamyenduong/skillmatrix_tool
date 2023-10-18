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


  constructor(private userService: UserService,
    private router: ActivatedRoute, private teamService: TeamService,
    private fb: FormBuilder, private messageService: MessageService,
    private cookieService: CookieService,) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const user_id = params.get('user_id');
      if (user_id !== null) {
        this.userService.getUserById(user_id).subscribe((data: User) => {
          if (data && data.team) {
            this.currentUser = data;

          }
        })
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
  updateUser() {
    const user_id = this.cookieService.getCookie("user_id");
    this.userService.getUserById(user_id).subscribe((existingUser) => {
      if (this.currentUser.full_name !== null) {
        existingUser.full_name = this.currentUser.full_name;
      }
      if (this.currentUser.email !== null) {
        existingUser.email = this.currentUser.email;
      }
      if (this.currentUser.phone_number !== null) {
        existingUser.phone_number = this.currentUser.phone_number;
      }
      if (this.currentUser.gender !== null) {
        existingUser.gender = this.currentUser.gender;
      }
      if (existingUser.team?.team_name && this.currentUser.team?.team_name !== null) {
        existingUser.team?.team_name = this.currentUser.team?.team_name;
      }
      if (this.currentUser.birthday !== null) {
        existingUser.birthday = this.currentUser.birthday;
      }
      if (this.hasChanges(existingUser, this.currentUser)) {
        this.userService.updateUser(user_id, existingUser).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update successful!' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update failed!' });
          }
        );
      }
    });
  }

  hasChanges(existingUser: User, currentUser: User) {
    if (existingUser.full_name !== currentUser.full_name) return true;
    if (existingUser.email !== currentUser.email) return true;

    return false;
  }
}
