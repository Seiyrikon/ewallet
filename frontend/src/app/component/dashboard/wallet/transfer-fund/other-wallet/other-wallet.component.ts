import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Friend } from 'src/app/interface/friend';
import { Principal } from 'src/app/interface/principal';
import { Transfer } from 'src/app/interface/transfer';
import { User } from 'src/app/interface/user';
import { Wallet } from 'src/app/interface/wallet';
import { FriendService } from 'src/app/service/friend/friend.service';
import { PrincipalService } from 'src/app/service/principal/principal.service';
import { UserService } from 'src/app/service/user/user.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-other-wallet',
  templateUrl: './other-wallet.component.html',
  styleUrls: ['./other-wallet.component.css']
})
export class OtherWalletComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription
  principal!: Principal;
  searchedFriends!: Friend[] | null;
  wallets!: Wallet[];
  user!: User;
  otherWallets!: Wallet[];
  otherWalletForm!: FormGroup;
  searchText!: string;
  errorMessage: string = '';
  showProgressBar: boolean = false;
  showSubmitButton: boolean = true;
  transferFromId: number = 0;
  transferToId: number = 0;
  recipientId: number = 0;
  isSubmitted: boolean = false;
  isOtherHidden: boolean = false;
  allUserInfo!: User[] | null;

  amount!: FormControl;
  note!: FormControl;

  matcher = new MyErrorStateMatcher();

  constructor
  (
    private _friendService: FriendService,
    private _walletService: WalletService,
    private _userService: UserService,
    private _principalService: PrincipalService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllUserWallet();
    this.getPrincipalInfo();
    this.initializeOtherWalletForm();
  }

  getPrincipalInfo(): any {
    this.showProgressBar = true;

    const principal$ = this._principalService.getPrincipalInfo();

    principal$.subscribe
    (
      (response) => {
        if(!response)
        {
          console.error('Response is empty');
        }
        this.principal = response.message[0];
      },
      (error) => {
        console.error('Principal Info not found', error);
        this.errorMessage = error;
        this.showProgressBar = false;
      },
      () => {
        this.showProgressBar = false;
        console.log(this.principal);

      }
    )
  }

  initializeOtherWalletForm() {
    const initialFormValues: Transfer = {
      amount: 0, // Provide initial values according to the interface
      note: ''
    };

    this.amount = new FormControl(initialFormValues.amount, [Validators.required]);
    this.note = new FormControl(initialFormValues.note);

    // Create a new FormGroup based on the LoginForm interface
    this.otherWalletForm = new FormGroup({
      amount: this.amount,
      note: this.note
    });
  }

  getAllUserWallet(): any
  {
    this.showProgressBar = true;

    const wallets$ = this._walletService.getAllUserWallet()

    wallets$.subscribe
    (
      (response) => {
        if (!response)
        {
          console.error('Response is empty');
        }
        this.wallets = response.message;
      },
      (error) => {
        console.error('Get Wallet Failed', error);
        this.errorMessage = error;
        this.showProgressBar = false;
      },
      () => {
        this.showProgressBar = false;
      }
    )
  }

  getAllWalletOfUser(user_id: number): any
  {
    this.showProgressBar = true;

    const otherWallets$ = this._walletService.getAllWalletOfUser(user_id)

    otherWallets$.subscribe
    (
      (response) => {
        if (!response)
        {
          console.error('Response is empty');
        }
        this.otherWallets = response.message;
      },
      (error) => {
        console.error('Get Wallet Failed', error);
        this.errorMessage = error;
        this.showProgressBar = false;
      },
      () => {
        this.showProgressBar = false;
        this.isOtherHidden = true;
      }
    )
  }

  getAllInfoOfUser(user_id: number): any
  {
      this.showProgressBar = true;
      const user$ = this._userService.getAllInfoOfUser(+user_id);

      user$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
          this.user = response.message[0];
        },
        (error) => {
          console.error('An error occured', error);
          this.errorMessage = error;
          this.showProgressBar = false;
        },
        () => {
          this.showProgressBar = false;
          console.log(this.user);

        }
      )
  }

  onOtherWalletSubmit(): any
  {
    console.log("Form is submitted");
    this.errorMessage = '';
    this.isSubmitted = !this.isSubmitted;
    if(this.otherWalletForm.valid)
    {
      this.showSubmitButton = false;
      this.showProgressBar = true; // Show the progress bar
      const otherWalletForm = this.otherWalletForm.value;
      console.log(otherWalletForm);

      const ownWalletTransfer$ = this._walletService.transferToOwn(otherWalletForm, +this.recipientId, +this.transferFromId, +this.transferToId);


      ownWalletTransfer$.subscribe
      (
        (response) => {
          if (!response) {
            console.error('Response is empty');

          }
        },
        (error) => {
          console.error('Transfer failed', error);
          this.isSubmitted = !this.isSubmitted;
          this.showProgressBar = false;
          this.showSubmitButton = true;
          this.errorMessage = error;
        },
        () => {
          // Upon completion of wallet creation (when the observable completes)
          this.showProgressBar = false; // Hide the progress bar
          this.showSubmitButton = true; // Show the "Add Wallet" button

          this._snackbar.open('Transfer Successful', 'Close', {
            duration: 1000,
          }).afterDismissed().subscribe(() => {
            this.transferFromId = 0;
            this.transferToId = 0;
            this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['wallet', 'transfer'] } }]);
          })
        }
      );
    }
  }

  searchUserByUsername(): any {
    if(this.searchText)
    {
      this.showProgressBar = true;
      const searchedFriends$ = this._userService.searchUserByUsername(this.searchText);

      searchedFriends$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
          this.allUserInfo = response.message;
          this.errorMessage = ''
          console.log(response.message);
        },
        (error) => {
          console.error('An error occured', error);
          this.errorMessage = error;
          this.showProgressBar = false;
        },
        () => {
          this.showProgressBar = false;
          this.errorMessage = ''
        }
      )
    }
    else
    {
      this.errorMessage = '';
      this.allUserInfo = null;
    }
  }

  onSearch(): void {
    console.log('Searched Text:', this.searchText);
    this.searchUserByUsername();
  }

  getSanitizedImage(image: any): any {
    // Assuming profilePicture is a base64 string
    const imageSrc = `data:image/png;base64,${image}`;
    return this._sanitizer.bypassSecurityTrustResourceUrl(imageSrc);
  }

  onFromSelect(walletId: number)
  {
    this.transferFromId = 0;
    this.transferFromId = walletId;
    console.log(walletId);

  }
  onToSelect(walletId: number)
  {
    this.transferToId = 0;
    this.transferToId = walletId;
    console.log(walletId);
  }

  onDeselectFrom()
  {
    this.transferFromId = 0;
  }
  onDeselectTo()
  {
    this.transferToId = 0;
  }

  onTransfer(user_id: number): any
  {
    this.recipientId = user_id;
    this.getAllWalletOfUser(user_id);
    this.getAllInfoOfUser(user_id);
  }

  onCancel(): any
  {
    this.searchText = '';
    this.isOtherHidden = false;
    this.allUserInfo = null;
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }
}
