import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-step1',
  templateUrl: './create-step1.component.html',
  styleUrls: ['./create-step1.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreateStep1Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  nextPage() {
    this.router.navigate(['create/step2']);
  }
}
