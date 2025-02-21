import { TestBed } from '@angular/core/testing';

import {ColoreHasProdottiService } from './colore-has-prodotti.service';

describe('ColoreHasModelloService', () => {
  let service: ColoreHasProdottiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColoreHasProdottiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
