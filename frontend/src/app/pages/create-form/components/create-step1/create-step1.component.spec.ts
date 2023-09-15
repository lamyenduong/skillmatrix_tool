import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStep1Component } from './create-step1.component';

describe('CreateStep1Component', () => {
  let component: CreateStep1Component;
  let fixture: ComponentFixture<CreateStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
