import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form } from '../../models/form.model';
import { MessageService } from 'primeng/api';
import { FormService } from 'src/app/services/form-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  forms!: Form[]
  displayUploadButton!: boolean

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.formService.getForms().then(forms => this.forms = forms);
  }

  showUploadDialog() {
    this.displayUploadButton = true
  }

  uploadFileByClick() {
    const fileInput = document.querySelector("#file") as HTMLInputElement;;
    if (fileInput.files && fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      const label = document.getElementById('fileLabel') as HTMLLabelElement;
      label.innerText = fileName;
    }
  }

  text = {
    mainFirstBar: 'Form Survey',
  }

}
