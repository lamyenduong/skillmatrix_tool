import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Form } from 'src/app/models/form.model';
import { SkillDomain } from 'src/app/models/skill-domain.model';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { FormService } from 'src/app/services/form/form-service.service';
import { SkillDomainService } from 'src/app/services/form/skill-domain-service.service';
import { TeamService } from 'src/app/services/form/team-service.service';
import { TextService } from 'src/app/services/text-service.service';
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

  constructor(private textService: TextService,
    private teamService: TeamService, private userService: UserService,
    private domainService: SkillDomainService, private fb: FormBuilder,
    private formService: FormService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.createFormPageText = data;
    });
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
      formManager: ['', Validators.required],
      formTeam: ['', Validators.required],
      formMember: ['', Validators.required],
      formDomain: ['', Validators.required]
    })
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
  }
  // form: Form = {
  //   form_name: '',
  //   form_description: '',
  //   form_deadline: this.secondStepForm.get('formDeadline')?.value.toString(),
  //   create_date: new Date,
  //   user: '';
  // }
  createForm() {
    //this.formService.createForm(this.form)
  }
}
