import { TestBed } from '@angular/core/testing';

import { ResoService } from './reso.service';

describe('ResoService', () => {
  let service: ResoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
