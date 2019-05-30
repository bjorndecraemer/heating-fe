import { TestBed } from '@angular/core/testing';

import { HeatingService } from './heating.service';

describe('HeatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeatingService = TestBed.get(HeatingService);
    expect(service).toBeTruthy();
  });
});
