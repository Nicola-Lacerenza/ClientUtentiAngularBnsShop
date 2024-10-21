import { TestBed } from '@angular/core/testing';

import { CodiceScontoService } from './codice-sconto.service';

describe('CodiceScontoService', () => {
  let service: CodiceScontoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodiceScontoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
