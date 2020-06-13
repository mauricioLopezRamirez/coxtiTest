import { TestBed } from '@angular/core/testing';

import { RegistrationUserService } from './registration-user.service';

describe('RegistrationUserService', () => {
  let service: RegistrationUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
