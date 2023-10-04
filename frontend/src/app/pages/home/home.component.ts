import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form } from '../../models/form.model';
import { MessageService } from 'primeng/api';
import { FormService } from 'src/app/services/form/form-service.service';
import { TextService } from 'src/app/services/text-service.service';
import { Router } from '@angular/router';
import { ReadFileService } from 'src/app/services/read-file.service';
import { User } from 'src/app/models/user.model';
import { CookieService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  formsOwner!: Form[]
  formsAssign!: Form[]
  homePageText: any
  selectedValue!: string
  user!: User | null

  constructor(private formService: FormService,
    private textService: TextService, private router: Router,
    private readFileService: ReadFileService,
    private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => this.homePageText = data);
    const user_id = this.cookieService.getCookie("user_id");
    this.formService.getFormOwner(user_id).subscribe((data: Form[]) => this.formsOwner = data);
    this.formService.getFormJoinInByUser(user_id).subscribe((data: Form[]) => this.formsAssign = data);
  }

  getFormOwnerByMe(form_id: string) {
    this.router.navigate(['/search', form_id]);
  }

  getFormAsignMe(form_id: string) {
    this.router.navigate(['/detail', form_id]);
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
      this.readFileService.readFile(this.droppedFile)
        .then((dataArray: any[][]) => {
          console.log("Data from dropped file:", dataArray);
        })
        .catch(error => {
          console.error("Error reading dropped file:", error);
        });
    } else {
      const fileInput = document.querySelector("#file") as HTMLInputElement;
      const filesToUpload = fileInput.files;
      if (filesToUpload && filesToUpload.length > 0) {
        const uploadedFile = filesToUpload[0];
        console.log("Uploading file from input:", uploadedFile);
        this.readFileService.readFile(uploadedFile)
          .then((dataArray: any[][]) => {
            console.log("Data from input file:", dataArray);
            this.sendData(dataArray);
          })
          .catch(error => {
            console.error("Error reading input file:", error);
          });
      } else {
        console.log("No file selected for upload.");
      }
    }
  }
  sendData(dataArray: any[][]): void {
    // Call a method on your API service to send the data to your API
    this.formService.createFormByUpload(dataArray)
      .subscribe(
        (response) => {
          console.log('Data sent to the server successfully:', response);
        },
        (error) => {
          console.error('Error sending data to the server:', error);
        }
      );
  }

  //Search
  onSearch(event: any) {
    // if (this.formService.)
  }
  submitSearchForm() {

  }
}
