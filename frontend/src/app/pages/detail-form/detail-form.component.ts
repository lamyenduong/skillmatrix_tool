import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    create_date: '',
    form_deadline: '',
    form_description: '',
    user: undefined
  }
  domains!: SkillDomain[]
  isEditing: boolean = false;
  isPanelEnabled: boolean = false;

  constructor(private router: ActivatedRoute,
    private routerNav: Router, private domainService: SkillDomainService,
    private formService: FormService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const form_id = params.get('form_id');
      if (form_id !== null) {
        console.log(form_id);
        this.formService.getFormById(form_id).subscribe(data => {
          if (data && data.form_name) {
            this.form = data;
            this.form.form_name = data.form_name
            console.log(this.form);
          } else {
            console.log("No data received.");
          }
        },
          (error) => {
            console.error("Error:", error);
          }
        );
        this.domainService.getDomainByFormId(form_id).subscribe((dataDomain) => {
          if (dataDomain) {
            this.domains = dataDomain;
            console.log(this.domains);
          } else {
            console.log("No data received.");
          }
        },
          (error) => {
            console.error("Error:", error);
          }
        );
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
