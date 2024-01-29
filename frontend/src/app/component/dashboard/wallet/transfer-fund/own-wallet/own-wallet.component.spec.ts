import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnWalletComponent } from './own-wallet.component';

describe('OwnWalletComponent', () => {
  let component: OwnWalletComponent;
  let fixture: ComponentFixture<OwnWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
