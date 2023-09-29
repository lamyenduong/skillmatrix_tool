import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  selectedPoint: number | null = null;

  constructor(private textService: TextService,
    private userService: UserService, private skillDomainService: SkillDomainService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.searchPageText = data;
    });
    this.userService.getAllUsers().subscribe(users => this.users = users)
    this.skillDomainService.getAllSkillDomains().subscribe(skillDomains => this.skillDomains = skillDomains)
    this.reactiveSkillDomainForm = this.fb.group({
      skillDomainsControl: new FormControl({}),
      selectedDomains: this.fb.array([])
    })
  }
  //Filter button
  showFilterDialog() {
    this.displayFilterButton = true
  }
  addToChip(selectedDomain: string) {
    if (selectedDomain) {
      const selectedDomains = this.reactiveSkillDomainForm.get('selectedDomains') as FormArray;
      selectedDomains.push(new FormControl(selectedDomain));
      this.reactiveSkillDomainForm.disable()
      console.log(selectedDomain)
    }
  }
  addPoint(selectedPoint: number) {
    if (selectedPoint) {
      this.selectedPoint = selectedPoint;
      this.reactiveSkillDomainForm.enable()
      //document.getElementById("pointValue")?.
    }
  }

  //Search
  searchEvent(e: any) {
    console.log(e.target.value)
  }
}
