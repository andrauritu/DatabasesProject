import { TestBed } from '@angular/core/testing';

import { GreenhouseService } from './greenhouses.service';

describe('GreenhousesService', () => {
  let service: GreenhouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreenhouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
