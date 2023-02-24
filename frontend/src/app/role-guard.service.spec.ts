import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RoleGuardService } from './role-guard.service';

describe('RoleGuardService', () => {
  let service: RoleGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(RoleGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
