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

  uploadDragStart(event: DragEvent) {

  }
}
