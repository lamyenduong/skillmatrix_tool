import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-create-step3',
  templateUrl: './create-step3.component.html',
  styleUrls: ['./create-step3.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreateStep3Component implements OnInit {
  items: MenuItem[] = [
    {
      icon: 'pi pi-send',
      label: 'Submit'
    },
    {
      icon: 'pi pi-save',
      label: 'Save'
    }
  ]
  selectedValue!: string

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  previousPage() {
    this.router.navigate(['create/step2']);
  }

  createForm() {

  }
}
