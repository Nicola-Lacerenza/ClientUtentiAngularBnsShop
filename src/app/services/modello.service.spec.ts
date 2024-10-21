import { TestBed } from '@angular/core/testing';

import { ModelloService } from './modello.service';

describe('ModelloService', () => {
  let service: ModelloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
