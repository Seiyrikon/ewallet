import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWalletComponent } from './view-wallet.component';

describe('ViewWalletComponent', () => {
  let component: ViewWalletComponent;
  let fixture: ComponentFixture<ViewWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
