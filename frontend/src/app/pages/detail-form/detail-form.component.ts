import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextService } from 'src/app/services/text-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from 'src/app/models/form.model';
import { SkillDomainService } from 'src/app/services/form/skill-domain-service.service';
import { SkillDomain } from 'src/app/models/skill-domain.model';
import { FormService } from 'src/app/services/form/form-service.service';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class DetailFormComponent implements OnInit {
  selectedValue!: string
  detailFormPageText: any
  form: Form = {
    form_id: '',
    form_name: '',
    create_date: undefined,
    form_deadline: '',
    form_description: ''
  }
  domains!: SkillDomain[]
  isEditing: boolean = false;
  isPanelEnabled: boolean = false;

  constructor(public textService: TextService, private router: ActivatedRoute,
    private routerNav: Router, private domainService: SkillDomainService,
    private formService: FormService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.detailFormPageText = data;
    });
    this.router.paramMap.subscribe(params => {
      const formId = params.get('form_id');
      if (formId !== null) {
        this.formService.getFormById(formId).subscribe(data => {
          if (data && data.form_name) {
            this.form = data;
            this.form.form_name = data.form_name
            console.log(this.form.form_name)
          }
        })
        this.domainService.getDomainByFormId(formId).subscribe(data => {
          if (data) {
            this.domains = data;
            console.log(this.domains)
          } else { console.log("error"); }
        })
      }
    })
  }
  //Back button
  backToHomePage() {
    this.routerNav.navigate(['/']);
  }
  //Edit button
  editDomainForm(event: any) {
    // const panel = document.querySelector("p-panel") as HTMLDivElement;
    // if (panel.classList.contains("p-panel-expanded")) {
    this.isEditing = true
    // }
  }
}
