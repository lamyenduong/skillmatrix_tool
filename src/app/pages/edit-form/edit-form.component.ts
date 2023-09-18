import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TextService } from 'src/app/services/text-service.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class EditFormComponent implements OnInit {
  selectedValue!: string
  editFormPageText: any

  constructor(public textService: TextService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.editFormPageText = data;
    });
  }
}
