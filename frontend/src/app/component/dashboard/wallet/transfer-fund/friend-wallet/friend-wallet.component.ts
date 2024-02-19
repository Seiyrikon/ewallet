import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExpiredSessionComponent } from 'src/app/component/common/expired-session/expired-session.component';
import { Friend } from 'src/app/interface/friend';
import { Principal } from 'src/app/interface/principal';
import { Transfer } from 'src/app/interface/transfer';
import { Wallet } from 'src/app/interface/wallet';
import { AuthService } from 'src/app/service/auth/auth.service';
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
  selector: 'app-friend-wallet',
  templateUrl: './friend-wallet.component.html',
  styleUrls: ['./friend-wallet.component.css']
})
export class FriendWalletComponent implements OnInit, OnDestroy
{

  private _subscription!: Subscription
  principal!: Principal;
  searchedFriends!: Friend[] | null;
  friends!: Friend[] | null;
  wallets!: Wallet[];
  friend!: Friend;
  friendWallets!: Wallet[];
  friendWalletForm!: FormGroup;
  searchText!: string;
  errorMessage: string = '';
  showProgressBar: boolean = false;
  showSubmitButton: boolean = true;
  transferFromId: number = 0;
  transferToId: number = 0;
  recipientId: number = 0;
  isSubmitted: boolean = false;
  isFriendHidden: boolean = false;

  amount!: FormControl;
  note!: FormControl;
  session!: any;

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
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isSessionExpired();
    this.getAllFriendsOfUser();
    this.getAllUserWallet();
    this.getPrincipalInfo();
    this.initializeFriendWalletForm();
    // console.log(this.friendRequestChecker(2));

  }

  isSessionExpired(): any {

    const session$ = this._authService.checkSession();

    session$.subscribe
    (
      (response) => {
        if(!response)
        {
          console.error('Response is empty');
        }
        this.session = response.message;
      },
      (error) => {
        console.error('Sesssion is expired', error);
        this.openExpiredSessionDialog();
        this._router.navigate(['/login']);
      },
      () => {
        console.log("Session: ", this.session);

      }
    )
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

  initializeFriendWalletForm() {
    const initialFormValues: Transfer = {
      amount: 0, // Provide initial values according to the interface
      note: ''
    };

    this.amount = new FormControl(initialFormValues.amount, [Validators.required]);
    this.note = new FormControl(initialFormValues.note);

    // Create a new FormGroup based on the LoginForm interface
    this.friendWalletForm = new FormGroup({
      amount: this.amount,
      note: this.note
    });
  }

  getAllFriendsOfUser(): any {
      this.showProgressBar = true;
      const friends$ = this._friendService.getAllFriendsOfUser();

      friends$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
          this.friends = response.message;
          this.errorMessage = ''
        },
        (error) => {
          console.error('An error occured', error);
          this.errorMessage = error;
          this.showProgressBar = false;
        },
        () => {
          this.showProgressBar = false;
          this.errorMessage = ''
          console.log(this.friends);

        }
      )
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

    const friendWallets$ = this._walletService.getAllWalletOfUser(user_id)

    friendWallets$.subscribe
    (
      (response) => {
        if (!response)
        {
          console.error('Response is empty');
        }
        this.friendWallets = response.message;
      },
      (error) => {
        console.error('Get Wallet Failed', error);
        this.errorMessage = error;
        this.showProgressBar = false;
      },
      () => {
        this.showProgressBar = false;
        this.isFriendHidden = true;
      }
    )
  }

  getAllInfoOfUser(user_id: number): any
  {
      this.showProgressBar = true;
      const friend$ = this._userService.getAllInfoOfUser(+user_id);

      friend$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
          this.friend = response.message[0];
        },
        (error) => {
          console.error('An error occured', error);
          this.errorMessage = error;
          this.showProgressBar = false;
        },
        () => {
          this.showProgressBar = false;
          console.log(this.friend);

        }
      )
  }

  onFriendWalletSubmit(): any
  {
    console.log("Form is submitted");
    this.errorMessage = '';
    this.isSubmitted = !this.isSubmitted;
    if(this.friendWalletForm.valid)
    {
      this.showSubmitButton = false;
      this.showProgressBar = true; // Show the progress bar
      const friendWalletForm = this.friendWalletForm.value;
      console.log(friendWalletForm);
      console.log(this.friend.friendId);

      const ownWalletTransfer$ = this._walletService.transferToOwn(friendWalletForm, +this.recipientId, +this.transferFromId, +this.transferToId);


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

  onCancel(): any
  {
    this.isFriendHidden = false;
    this.getAllFriendsOfUser();
  }

  onTransfer(user_id: number): any
  {
    this.recipientId = user_id;
    this.getAllWalletOfUser(user_id);
    this.getAllInfoOfUser(user_id);
  }

  openExpiredSessionDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this._dialog.open(ExpiredSessionComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true); // User confirmed leaving
          this._router.navigate(['/login']);
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
