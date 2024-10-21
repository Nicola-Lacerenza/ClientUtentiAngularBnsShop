import { TestBed } from '@angular/core/testing';

import { FornitoriHasProdottiService } from './fornitori-has-prodotti.service';

describe('FornitoriHasProdottiService', () => {
  let service: FornitoriHasProdottiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FornitoriHasProdottiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
