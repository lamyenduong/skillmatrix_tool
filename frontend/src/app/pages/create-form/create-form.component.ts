import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { Form } from 'src/app/models/form.model';
import { SkillDomain } from 'src/app/models/skill-domain.model';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { CookieService } from 'src/app/services/cookie-service.service';
import { FormService } from 'src/app/services/form/form-service.service';
import { SkillDomainService } from 'src/app/services/form/skill-domain-service.service';
import { TeamService } from 'src/app/services/form/team-service.service';
import { UserService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreateFormComponent implements OnInit {
  createFormPageText: any
  isFirstStep: boolean = true
  isSecondStep!: boolean
  isThirdStep!: boolean
  teams!: Team[]
  users!: User[]
  currentUser!: User
  form: Form = {
    form_id: '',
    form_name: '',
    create_date: '',
    form_deadline: '',
    form_description: '',
    user: undefined,
  }
  domains!: SkillDomain[]
  selectedValue!: string
  currentStep = 0
  firstStepForm!: FormGroup
  secondStepForm!: FormGroup
  items: MenuItem[] = [
    { label: 'Create' },
    { label: 'In progress', },
    { label: 'Finished' }];
  items3: MenuItem[] = [
    {
      icon: 'pi pi-send',
      label: 'Submit'
    },
    {
      icon: 'pi pi-save',
      label: 'Save'
    }
  ]
  //Default date 
  date = new Date();
  currentDay = this.date.getUTCDay();
  currentMonth = this.date.getUTCMonth() + 1;
  currentYear = this.date.getUTCFullYear();
  day: any
  month: any
  formStartTime!: string
  //const deadline =

  constructor(
    private teamService: TeamService, private userService: UserService,
    private domainService: SkillDomainService, private fb: FormBuilder,
    private formService: FormService, private cookieService: CookieService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe(teams => this.teams = teams)
    this.userService.getAllUsers().subscribe(users => this.users = users)
    this.domainService.getAllSkillDomains().subscribe(domains => this.domains = domains)

    this.firstStepForm = this.fb.group({
      formName: ['', Validators.required],
      formDescription: ['', Validators.required],
    })
    this.secondStepForm = this.fb.group({
      formStartTime: ['', Validators.required],
      formDeadline: ['', Validators.required],
      formManager: [''],
      formTeam: ['', Validators.required],
      formMember: [''],
      formDomain: ['', Validators.required],
    })

    this.day = this.currentDay < 10 ? "0" + this.currentDay : this.currentDay;
    this.month = this.currentMonth < 10 ? "0" + this.currentMonth : this.currentMonth;
    this.formStartTime = `${this.currentYear}-${this.month}-${this.day}`;
    this.secondStepForm.get('formStartTime')?.setValue(this.formStartTime);
  }
  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      }
    });
  }
  navigateToFirstStep() {
    this.currentStep = 0
    this.isFirstStep = true;
    this.isSecondStep = false;
    this.isThirdStep = false;
  }
  navigateToSecondStep() {
    if (this.currentStep === 0 && this.firstStepForm.valid) {
      this.currentStep = 1
      this.isFirstStep = false;
      this.isSecondStep = true;
      this.isThirdStep = false;
    } else {
      this.markFormControlsAsTouched(this.firstStepForm);
    }
    if (this.currentStep === 2) {
      this.currentStep = 1
      this.isFirstStep = false;
      this.isSecondStep = true;
      this.isThirdStep = false;
    }
  }
  navigateToThirdStep() {
    if (this.currentStep === 1 && this.secondStepForm.valid) {
      this.currentStep = 2
      this.isFirstStep = false;
      this.isSecondStep = false;
      this.isThirdStep = true;
    } else {
      this.markFormControlsAsTouched(this.secondStepForm)
    }
    this.formVariable()
  }
  formVariable() {
    const user_id = this.cookieService.getCookie("user_id");
    this.userService.getUserById(user_id).subscribe((user: User) => { this.currentUser = user })
    const form = {
      form_id: '',
      form_name: this.firstStepForm.get('formName')?.value,
      form_description: this.firstStepForm.get('formDescription')?.value,
      form_deadline: this.secondStepForm.get('formDeadline')?.value,
      create_date: this.secondStepForm.get('formStartTime')?.value,
      user: this.currentUser
    }
    this.form = form

    console.log
    return this.form
  }
  createForm() {
    this.formService.createForm(this.formVariable()).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creation successful!' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation failed!' });
      }
    )
  }
  selectedTeams: Team[] = [];
  members!: User[]
  team!: Team
  getMemberInTeam(selectedTeams: Team[]) {
    console.log('Selected teams:', selectedTeams);

    selectedTeams.map((team: Team) => {
      const team0: Team = {
        team_id: team.team_id,
        team_name: team.team_name,
        status: team.status
      };
      console.log(team0.team_id)
      const team_id = team0.team_id;
      this.userService.getUserInTeam(team_id).subscribe((data: User[]) => {
        if (data) {
          this.members = data;
          console.log(this.members);
        }
      });
    });
  }

}
