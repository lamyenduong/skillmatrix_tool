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

  constructor(private formService: FormService, private textService: TextService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.homePageText = data;
    });
    this.formService.getAllForms().subscribe(data => { this.forms = data; });
  }

  //Upload File  
  displayUploadButton!: boolean
  isDragOver = false;
  fileSelected = false;
  droppedFile: File | null = null;
  showUploadDialog() {
    this.displayUploadButton = true;
  }
  onFileInputChange(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.fileSelected = true;
      const fileName = fileInput.files[0].name;
      const label = document.querySelector('#fileLabel') as HTMLLabelElement;
      label.innerText = fileName;
    } else {
      this.fileSelected = false;
    }
  }
  onFileDrop(event: any): void {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.droppedFile = files[0];
      const fileName = this.droppedFile?.name;
      if (fileName) {
        const label = document.querySelector('#fileLabel') as HTMLLabelElement;
        label.innerText = fileName;
        this.fileSelected = true;
      }
    }
  }
  onDragOver(event: any): void {
    event.preventDefault();
    this.isDragOver = true;
  }
  onDragLeave(event: any): void {
    event.preventDefault();
    this.isDragOver = false;
  }
  onUploadFile() {
    if (this.droppedFile) {
      console.log("Uploading dropped file:", this.droppedFile);
    } else {
      const fileInput = document.querySelector("#file") as HTMLInputElement;
      const filesToUpload = fileInput.files;
      if (filesToUpload && filesToUpload.length > 0) {
        const uploadedFile = filesToUpload[0];
        console.log("Uploading file from input:", uploadedFile);
      } else {
        console.log("No file selected for upload.");
      }
    }
  }

  //Search
  onSearchChangeHome(event: any) {
    console.log(event.target.value);
  }
  submitSearchForm() { }
}
