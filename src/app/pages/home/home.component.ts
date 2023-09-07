import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  forms!: Form[]
  displayUploadButton!: boolean

  constructor() { }

  ngOnInit(): void {
  }

  showUploadDialog() {
    this.displayUploadButton = true
  }

  dragFile(event: DragEvent) {
    event.preventDefault();
    document.querySelectorAll('.upload__input').forEach(input => {
      const formElement = event.currentTarget as HTMLElement;
      formElement?.addEventListener('dragover', e => {
        formElement.classList.add('.form__upload-over')
      });
      ['dragleave', 'dragend'].forEach(type => {
        formElement?.addEventListener(type, e => {
          formElement.classList.remove('.form__upload-over')
        })
      });
    })
  }
}
