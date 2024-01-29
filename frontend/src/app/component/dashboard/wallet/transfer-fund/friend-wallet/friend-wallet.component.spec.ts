import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendWalletComponent } from './friend-wallet.component';

describe('FriendWalletComponent', () => {
  let component: FriendWalletComponent;
  let fixture: ComponentFixture<FriendWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
