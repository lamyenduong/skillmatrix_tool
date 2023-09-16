import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TextService } from 'src/app/services/text-service.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreateFormComponent implements OnInit {
  createFormPageText: any

  items: MenuItem[] = [{
    label: 'Create',
    routerLink: 'step1'
  },
  {
    label: 'In progress',
    routerLink: 'step2'
  },
  {
    label: 'Finished',
    routerLink: 'step3'
  },
  ];

  constructor(private textService: TextService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.createFormPageText = data;
    });
  }

}
