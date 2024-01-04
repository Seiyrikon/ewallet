import { TestBed } from '@angular/core/testing';

import { EditProfileFormGuard } from './edit-profile-form.guard';

describe('EditProfileFormGuard', () => {
  let guard: EditProfileFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditProfileFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
