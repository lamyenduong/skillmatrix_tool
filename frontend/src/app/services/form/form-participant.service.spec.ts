import { TestBed } from '@angular/core/testing';

import { FormParticipantService } from './form-participant.service';

describe('FormParticipantService', () => {
  let service: FormParticipantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormParticipantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
