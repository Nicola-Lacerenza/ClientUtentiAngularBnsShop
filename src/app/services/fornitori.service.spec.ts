import { TestBed } from '@angular/core/testing';

import { FornitoriService } from './fornitori.service';

describe('FornitoriService', () => {
  let service: FornitoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FornitoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
