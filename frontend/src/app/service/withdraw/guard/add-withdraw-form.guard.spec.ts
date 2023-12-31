import { TestBed } from '@angular/core/testing';

import { AddWithdrawFormGuard } from './add-withdraw-form.guard';

describe('AddWithdrawFormGuard', () => {
  let guard: AddWithdrawFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddWithdrawFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
