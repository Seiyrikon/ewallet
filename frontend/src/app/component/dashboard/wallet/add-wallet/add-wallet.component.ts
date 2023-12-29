import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddWalletForm } from 'src/app/interface/add-wallet-form';
import { WalletService } from 'src/app/service/wallet/wallet.service';

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

  constructor
  (
    private _walletService: WalletService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    const initialFormValues: AddWalletForm = {
      wallet_name: '', // Provide initial values according to the interface
      wallet_desc: ''
    };

    // Create a new FormGroup based on the LoginForm interface
    this.addWalletForm = new FormGroup({
      wallet_name: new FormControl(initialFormValues.wallet_name, [Validators.required]),
      wallet_desc: new FormControl(initialFormValues.wallet_desc, [Validators.required])
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

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }

}
