import { TestBed } from '@angular/core/testing';

import { ColoreHasModelloService } from './colore-has-modello.service';

describe('ColoreHasModelloService', () => {
  let service: ColoreHasModelloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColoreHasModelloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
