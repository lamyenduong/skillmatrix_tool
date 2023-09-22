import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStep3Component } from './create-step3.component';

describe('CreateStep3Component', () => {
  let component: CreateStep3Component;
  let fixture: ComponentFixture<CreateStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStep3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
