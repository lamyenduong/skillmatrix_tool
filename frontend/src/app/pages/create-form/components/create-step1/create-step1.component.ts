import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-step1',
  templateUrl: './create-step1.component.html',
  styleUrls: ['./create-step1.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreateStep1Component implements OnInit {
  firstStepForm!: FormGroup

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.firstStepForm = this.fb.group({
      formName: [],
      formDescription: []
    })
  }
  nextPage() {
    this.router.navigate(['create/step2']);
  }
}
