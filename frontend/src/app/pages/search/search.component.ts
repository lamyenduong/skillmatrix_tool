import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from 'src/app/models/form.model';
import { Domain } from 'src/app/models/domain.model';
import { User } from 'src/app/models/user.model';
import { FormService } from '../../services/form/form.service';
import { DomainService } from '../../services/form/domain.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  searchPageText: any
  users!: User[]
  form: Form = {
    form_id: '',
    form_name: '',
    create_date: '',
    form_deadline: '',
    form_description: ''
  }
  displayFilterButton!: boolean
  skillDomains!: Domain[]
  reactiveSkillDomainForm!: FormGroup
  points: any[] = ["any", 1, 2, 3, 4, 5]

  selectedDomainsWithPoints: { domain: any, point: any }[] = [];

  constructor(
    private userService: UserService, private domainService: DomainService,
    private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute, private formService: FormService) { }

  ngOnInit(): void {
    this.domainService.getAllSkillDomains().subscribe(skillDomains => this.skillDomains = skillDomains)
    this.reactiveSkillDomainForm = this.fb.group({
      skillDomainsControl: new FormControl()
    });
    this.route.paramMap.subscribe(params => {
      const formId = params.get('form_id');
      if (formId !== null) {
        this.formService.getFormParticipants(formId).subscribe(data => {
          if (data) {
            this.users = data;
            console.log(this.users);
          }
        })
        this.formService.getFormById(formId).subscribe(data => {
          if (data && data.form_name) {
            this.form = data;
            this.form.form_name = data.form_name
          }
        })
      }
    })
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
