import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextService } from 'src/app/services/text-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form/form-service.service';
import { Form } from 'src/app/models/form.model';
import { FormSkillService } from 'src/app/services/form/form-skill-service.service';
import { FormSkill } from 'src/app/models/form-skill.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class DetailFormComponent implements OnInit {
  selectedValue!: string
  detailFormPageText: any
  formId!: string | null;
  form!: Form;
  formSkill!: FormSkill

  constructor(public textService: TextService, private router: ActivatedRoute,
    private routerNav: Router, private formService: FormService, private formSkillService: FormSkillService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.detailFormPageText = data;
    });
    this.router.paramMap.subscribe(params => {
      this.formId = params.get('form_id');
      if (this.formId !== null) {
        forkJoin([
          this.formService.getFormById(this.formId),
          this.formSkillService.getFormSkillByFormId(this.formId)
        ]).subscribe(data => {
          this.form = data[0];
          this.formSkill = data[1];
          if (this.form && this.formSkill) {
            console.log(this.formSkill?.skill?.skill_domain?.domain_name);
          }
        });
      }
    });
  }
  //Back button
  backToHomePage() {
    this.routerNav.navigate(['/']);
  }
}
