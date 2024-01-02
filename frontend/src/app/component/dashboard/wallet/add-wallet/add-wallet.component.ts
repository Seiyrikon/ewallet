import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CancelModalComponent } from 'src/app/component/common/cancel-modal/cancel-modal.component';
import { LeaveModalComponent } from 'src/app/component/common/leave-modal/leave-modal.component';
import { AddWalletForm } from 'src/app/interface/add-wallet-form';
import { WalletService } from 'src/app/service/wallet/wallet.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.css']
})
export class AddWalletComponent implements OnInit, OnDestroy
{

  private _subscription!: Subscription;
  addWalletForm!: FormGroup;
  errorMessage: string = '';
  wallet_name!: FormControl;
  wallet_desc!: FormControl<string | null>;

  matcher = new MyErrorStateMatcher();

  constructor
  (
    private _walletService: WalletService,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    const initialFormValues: AddWalletForm = {
      wallet_name: '', // Provide initial values according to the interface
      wallet_desc: ''
    };

    this.wallet_name = new FormControl(initialFormValues.wallet_name, [Validators.required]);
    this.wallet_desc = new FormControl(initialFormValues.wallet_desc);

    // Create a new FormGroup based on the LoginForm interface
    this.addWalletForm = new FormGroup({
      wallet_name: this.wallet_name,
      wallet_desc: this.wallet_desc
    });
  }

  onSubmit() {
    if(this.addWalletForm.valid)
    {
      const addWalletBody = this.addWalletForm.value;
      console.log(addWalletBody);

      this._subscription = this._walletService.inserWallet(addWalletBody)
      .subscribe(
        (response) => {
          if (response) {
            const result = response.message; // Assuming the token is in the 'message' property
            this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet'] } }]);
            console.log(result);
          }
          else
          {
            console.error('Response is empty');
          }
        },
        (error) => {
          console.error('Add wallet failed', error);
          this.errorMessage = error;
        }
      )
    }
  }

  openCancelConfirmationDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(CancelModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
          this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet'] } }]);
        } else {
          resolve(false); // User canceled leaving
        }
      });
    });
  }

  openLeaveConfirmationDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(LeaveModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
        } else {
          resolve(false); // User canceled leaving
        }
      });
    });
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
