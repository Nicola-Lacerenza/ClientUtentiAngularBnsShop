import { TestBed } from '@angular/core/testing';

import { PopUpManagerService } from './pop-up-manager.service';

describe('PopUpManagerService', () => {
  let service: PopUpManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
