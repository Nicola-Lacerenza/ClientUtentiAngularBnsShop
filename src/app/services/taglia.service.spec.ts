import { TestBed } from '@angular/core/testing';

import { TagliaService } from './taglia.service';

describe('TagliaService', () => {
  let service: TagliaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagliaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
