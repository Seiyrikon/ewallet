import { TestBed } from '@angular/core/testing';

import { AddDepositFormGuard } from './add-deposit-form.guard';

describe('AddDepositFormGuard', () => {
  let guard: AddDepositFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddDepositFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
