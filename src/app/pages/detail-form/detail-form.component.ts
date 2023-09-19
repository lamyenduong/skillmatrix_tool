import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TextService } from 'src/app/services/text-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/services/form-service.service';
import { Form } from 'src/app/models/form.model';

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

  constructor(public textService: TextService, private router: ActivatedRoute, private formService: FormService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.detailFormPageText = data;
    });
    this.router.paramMap.subscribe(params => {
      this.formId = params.get('form_id');
      if (this.formId !== null) {
        this.formService.getFormById(this.formId).subscribe(data => {
          this.form = data;
        });
      }
    })
  }
}
