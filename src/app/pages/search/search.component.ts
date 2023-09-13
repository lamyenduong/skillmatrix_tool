import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SkillDomain } from 'src/app/models/skill-domain.model';
import { User } from 'src/app/models/user.model';
import { SkillDomainService } from 'src/app/services/skil-domain-service.service';
import { TextService } from 'src/app/services/text-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  searchPageText: any
  users!: User[]
  displayFilterButton!: boolean
  skillDomains!: SkillDomain[]

  constructor(private textService: TextService, private userService: UserService, private skillDomainnService: SkillDomainService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.searchPageText = data;
    });
    this.userService.getAllUsers().then(users => this.users = users)
    this.skillDomainnService.getAllSkillDomains().then(skillDomains => this.skillDomains = skillDomains)
  }

  showFilterDialog() {
    this.displayFilterButton = true
  }
}
