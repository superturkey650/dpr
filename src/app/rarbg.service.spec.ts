import { TestBed } from '@angular/core/testing';

import { RarbgService } from './rarbg.service';

describe('RarbgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RarbgService = TestBed.get(RarbgService);
    expect(service).toBeTruthy();
  });
});
