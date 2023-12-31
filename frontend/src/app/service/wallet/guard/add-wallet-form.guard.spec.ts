import { TestBed } from '@angular/core/testing';

import { AddWalletFormGuard } from './add-wallet-form.guard';

describe('AddWalletFormGuard', () => {
  let guard: AddWalletFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddWalletFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
