import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherWalletComponent } from './other-wallet.component';

describe('OtherWalletComponent', () => {
  let component: OtherWalletComponent;
  let fixture: ComponentFixture<OtherWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
