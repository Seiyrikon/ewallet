import { TestBed } from '@angular/core/testing';

import { OverallbalanceService } from './overallbalance.service';

describe('OverallbalanceService', () => {
  let service: OverallbalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverallbalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
