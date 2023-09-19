import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SkillDomain } from 'src/app/models/skill-domain.model';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { SkillDomainService } from 'src/app/services/skil-domain-service.service';
import { TeamService } from 'src/app/services/team-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-create-step2',
  templateUrl: './create-step2.component.html',
  styleUrls: ['./create-step2.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateStep2Component implements OnInit {
  teams!: Team[]
  users!: User[]
  domains!: SkillDomain[]

  constructor(private router: Router, private teamService: TeamService, private userService: UserService, private domainService: SkillDomainService) { }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe(teams => this.teams = teams)
    this.userService.getAllUsers().subscribe(users => this.users = users)
    this.domainService.getAllSkillDomains().subscribe(domains => this.domains = domains)
  }
  previousPage() {
    this.router.navigate(['create/step1']);
  }
  nextPage() {
    this.router.navigate(['create/step3']);
  }
}
