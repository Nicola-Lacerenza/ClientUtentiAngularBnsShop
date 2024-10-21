import { TestBed } from '@angular/core/testing';

import { ImmaginiService } from './immagini.service';

describe('ImmaginiService', () => {
  let service: ImmaginiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmaginiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
