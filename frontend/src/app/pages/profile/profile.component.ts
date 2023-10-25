import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
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
  user: User = {
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

  constructor(
    private userService: UserService,
    private router: ActivatedRoute,
    private teamService: TeamService,
    private fb: FormBuilder,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const user_id = params.get('user_id');
      console.log(user_id)
      if (user_id) {
        this.userService.getUserById(user_id).subscribe((data: any) => {
          const user: User = {
            user_id: data._id,
            password: data.password,
            full_name: data.full_name,
            gender: data.gender,
            phone_number: data.phone_number,
            birthday: data.birthday,
            email: data.email,
            status: data.status,
            role: data.role,
            create_date: data.create_date,
            avatar: data.avatar,
            team: data.team
          }
          this.currentUser = user;
          console.log(this.currentUser)
        })
      }
    })
    this.teamService.getAllTeams().subscribe(teams => this.teams = teams)
    this.formUpdate = this.fb.group({
      email: '',
      fname: '',
      phone_number: '',
      gender: '',
      dob: '',
      team: '',
    })
  }

  showEditInfoDialog() {
    this.displayEditInfoButton = true
  }

  updateUser() {
    if (this.formUpdate.valid) {
      this.router.paramMap.subscribe(params => {
        const user_id = params.get('user_id');
        if (user_id) {
          this.userService.getUserById(user_id).subscribe((data: any) => {
            const user1: User = {
              user_id: data._id,
              password: data.password,
              full_name: data.full_name,
              gender: data.gender,
              phone_number: data.phone_number,
              birthday: data.birthday,
              email: data.email,
              status: data.status,
              role: data.role,
              create_date: data.create_date,
              avatar: data.avatar,
              team: data.team
            }
            this.currentUser = user1;
          })
          const user: User = {
            user_id: user_id,
            email: this.formUpdate.get('email')?.value || this.currentUser.email,
            full_name: this.formUpdate.get('fname')?.value || this.currentUser.full_name,
            birthday: this.formUpdate.get('dob')?.value || this.currentUser.birthday,
            gender: this.formUpdate.get('gender')?.value || this.currentUser.gender,
            phone_number: this.formUpdate.get('phone_number')?.value || this.currentUser.phone_number,
            avatar: this.currentUser.avatar,
            status: this.currentUser.status,
            password: this.currentUser.password,
            create_date: this.currentUser.create_date,
            role: this.currentUser.role,
            team: this.formUpdate.get('team')?.value || this.currentUser.team
          }
          this.user = user
          this.userService.updateUser(user_id, this.user).subscribe(
            () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update successful!' });
              this.displayEditInfoButton = false
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update failed!' });
            }
          );
        }
      })
    }
  }
}