import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SkillDomain } from 'src/app/models/skill-domain.model';
import { User } from 'src/app/models/user.model';
import { SkillDomainService } from 'src/app/services/form/skill-domain-service.service';
import { TextService } from 'src/app/services/text-service.service';
import { UserService } from 'src/app/services/user/user-service.service';

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
  points: any[] = ["any", 1, 2, 3, 4, 5]

  selectedDomainsWithPoints: { domain: any, point: any }[] = [];

  constructor(private textService: TextService,
    private userService: UserService, private skillDomainService: SkillDomainService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.searchPageText = data;
    });
    this.userService.getAllUsers().subscribe(users => this.users = users)
    this.skillDomainService.getAllSkillDomains().subscribe(skillDomains => this.skillDomains = skillDomains)
    this.reactiveSkillDomainForm = this.fb.group({
      skillDomainsControl: new FormControl()
    });
  }
  //Back button
  backToHomePage() {
    this.router.navigate(['/']);
  }
  //Filter button
  showFilterDialog() {
    this.displayFilterButton = true
  }
  addToChip(domain: string) {
    this.selectedDomainsWithPoints.push({ domain: domain, point: 'any' });
  }
  addPoint(point: any) {
    if (this.selectedDomainsWithPoints.length > 0) {
      this.selectedDomainsWithPoints[this.selectedDomainsWithPoints.length - 1].point = point;
    }
  }
  //Search
  searchEvent(e: any) {
    console.log(e.target.value)
  }
}
