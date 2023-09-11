import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form } from '../../models/form.model';
import { MessageService } from 'primeng/api';
import { FormService } from 'src/app/services/form-service.service';
import { TextService } from 'src/app/services/text-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  forms!: Form[]
  homePageText: any
  displayUploadButton!: boolean

  constructor(private formService: FormService, private textService: TextService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.homePageText = data;
    });
    this.formService.getForms().then(forms => this.forms = forms);
  }

  showUploadDialog() {
    this.displayUploadButton = true
  }

  changeUploadLabel() {
    const fileInput = document.querySelector("#file") as HTMLInputElement;;
    if (fileInput.files && fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      const label = document.querySelector('#fileLabel') as HTMLLabelElement;
      label.innerText = fileName;
    }
  }

  onUploadFile() {

  }
}
