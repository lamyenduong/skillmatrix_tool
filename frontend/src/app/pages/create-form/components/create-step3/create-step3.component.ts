import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-step3',
  templateUrl: './create-step3.component.html',
  styleUrls: ['./create-step3.component.sass']
})
export class CreateStep3Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  previousPage() {
    this.router.navigate(['create/step1']);
  }
}
