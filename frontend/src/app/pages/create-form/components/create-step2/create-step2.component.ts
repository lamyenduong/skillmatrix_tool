import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-step2',
  templateUrl: './create-step2.component.html',
  styleUrls: ['./create-step2.component.sass']
})
export class CreateStep2Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  previousPage() {
    this.router.navigate(['create/step1']);
  }
  nextPage() {
    this.router.navigate(['create/step3']);
  }
}
