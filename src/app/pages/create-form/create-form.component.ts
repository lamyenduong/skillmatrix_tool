import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextService } from 'src/app/services/text-service.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreateFormComponent implements OnInit {
  createFormPageText: any

  constructor(private textService: TextService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.createFormPageText = data;
    });
  }
}
