import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  reactiveSkillDomainForm!: FormGroup
  points: number[] = [1, 2, 3, 4, 5]

  constructor(private textService: TextService, private userService: UserService, private skillDomainService: SkillDomainService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.searchPageText = data;
    });
    this.userService.getAllUsers().subscribe(users => this.users = users)
    this.skillDomainService.getAllSkillDomains().subscribe(skillDomains => this.skillDomains = skillDomains)
    this.reactiveSkillDomainForm = new FormGroup({
      skillDomainsControl: new FormControl({}),
    })
    this.subscribeDomainsChange()
  }
  showFilterDialog() {
    this.displayFilterButton = true
  }

  subscribeDomainsChange() {
    const domainCtrl = this.reactiveSkillDomainForm.get('skillDomainsControl');
    console.log(domainCtrl)
    if (domainCtrl) {
      domainCtrl.valueChanges.subscribe((data) => {
        console.log(data)
      })
    }
  }

}
