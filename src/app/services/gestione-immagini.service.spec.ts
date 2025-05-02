import { TestBed } from '@angular/core/testing';

import { GestioneImmaginiService } from './gestione-immagini.service';

describe('GestioneImmaginiService', () => {
  let service: GestioneImmaginiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestioneImmaginiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
