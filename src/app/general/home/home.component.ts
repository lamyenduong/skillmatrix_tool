import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  displayUploadButton!: boolean

  constructor() { }

  ngOnInit(): void {
  }

  showUploadDialog() {
    this.displayUploadButton = true
  }
}
