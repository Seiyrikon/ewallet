import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
export class AddWalletComponent implements OnInit, OnDestroy {

  private _subscription!: Subscription;
  addWalletForm!: FormGroup;
  errorMessage: string = '';
  wallet_name!: FormControl;
  wallet_desc!: FormControl;
  isSubmitted: boolean = false;
  isCancelled: boolean = false;
  showProgressBar: boolean = false;
  showSubmitButton: boolean = true;
  showCancelButton: boolean = true;

  matcher = new MyErrorStateMatcher();

  constructor
    (
      private _walletService: WalletService,
      private _router: Router,
      private _dialog: MatDialog,
      private _snackbar: MatSnackBar
    ) { }

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
    this.errorMessage = '';
    this.isSubmitted = !this.isSubmitted;
    if (this.addWalletForm.valid) {
      this.showSubmitButton = false;
      this.showCancelButton = false;
      this.showProgressBar = true; // Show the progress bar

      const addWalletBody = this.addWalletForm.value;
      console.log(addWalletBody);

      // Display the progress bar while the wallet creation is in progress
      const walletCreation$ = this._walletService.inserWallet(addWalletBody);

      walletCreation$.subscribe(
        (response) => {
          if (!response) {
            console.error('Response is empty');
          }
        },
        (error) => {
          console.error('Add wallet failed', error);
          this.errorMessage = error;
        },
        () => {
          // Upon completion of wallet creation (when the observable completes)
          this.showProgressBar = false; // Hide the progress bar
          this.showSubmitButton = true; // Show the "Add Wallet" button
          this.showCancelButton = true; // Show the "Cancel" button

          this._snackbar.open('Wallet created successfully!', 'Close', {
            duration: 1000, // Display duration in milliseconds (2 seconds) for the snackbar
          }).afterDismissed().subscribe(() => {
            this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet'] } }]);
          });
        }
      );
    }
  }

  openCancelConfirmationDialog(): Promise<boolean> {
    this.isCancelled = !this.isCancelled;
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
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

}
