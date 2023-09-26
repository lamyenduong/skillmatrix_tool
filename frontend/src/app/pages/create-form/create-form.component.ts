import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SkillDomain } from 'src/app/models/skill-domain.model';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { SkillDomainService } from 'src/app/services/skill-domain-service.service';
import { TeamService } from 'src/app/services/team-service.service';
import { TextService } from 'src/app/services/text-service.service';
import { UserService } from 'src/app/services/user-service.service';

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
  items: MenuItem[] = [{
    label: 'Create',
  },
  {
    label: 'In progress',
  },
  {
    label: 'Finished',
  },
  ];
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
    private domainService: SkillDomainService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.createFormPageText = data;
    });
    this.teamService.getAllTeams().subscribe(teams => this.teams = teams)
    this.userService.getAllUsers().subscribe(users => this.users = users)
    this.domainService.getAllSkillDomains().subscribe(domains => this.domains = domains)
  }
  navigateToFirstStep() {
    this.currentStep = 0
    this.isFirstStep = true;
    this.isSecondStep = false;
    this.isThirdStep = false;
  }
  navigateToSecondStep() {
    this.currentStep = 1
    this.isFirstStep = false;
    this.isSecondStep = true;
    this.isThirdStep = false;
  }
  navigateToThirdStep() {
    this.currentStep = 2
    this.isFirstStep = false;
    this.isSecondStep = false;
    this.isThirdStep = true;
  }
  createForm() {

  }
}
