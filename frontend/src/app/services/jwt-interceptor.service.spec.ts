import { TestBed } from '@angular/core/testing';

import { JwtInterceptor } from './jwt-interceptor.service';

describe('NavbarService', () => {
    let service: JwtInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(JwtInterceptor);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
