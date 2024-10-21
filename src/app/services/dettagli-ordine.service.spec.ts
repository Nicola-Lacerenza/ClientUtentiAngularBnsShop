import { TestBed } from '@angular/core/testing';

import { DettagliOrdineService } from './dettagli-ordine.service';

describe('DettagliOrdineService', () => {
  let service: DettagliOrdineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DettagliOrdineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
