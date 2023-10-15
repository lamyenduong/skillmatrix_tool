import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from 'src/app/models/form.model';
import { DomainService } from '../../services/form/domain.service';
import { Domain } from 'src/app/models/domain.model';
import { FormService } from '../../services/form/form.service';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class DetailFormComponent implements OnInit {
  points = [0, 1, 2, 3, 4, 5]
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
  domains!: Domain[]
  isEditing: boolean = false;
  isPanelEnabled: boolean = false;

  constructor(private router: ActivatedRoute,
    private routerNav: Router, private domainService: DomainService,
    private formService: FormService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const form_id = params.get('form_id');
      if (form_id !== null) {
        this.formService.getFormById(form_id).subscribe(data => {
          if (data && data.form_name) {
            this.form = data;
            this.form.form_name = data.form_name
          } else {
            console.log("No data received.");
          }
        },
          (error) => {
            console.error("Error:", error);
          }
        );
        this.domainService.getDomainByFormId(form_id).subscribe(data => {
          if (data) {
            this.domains = data;
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
