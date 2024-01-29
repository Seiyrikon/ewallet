import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Friend } from 'src/app/interface/friend';
import { Wallet } from 'src/app/interface/wallet';
import { FriendService } from 'src/app/service/friend/friend.service';
import { UserService } from 'src/app/service/user/user.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

@Component({
  selector: 'app-friend-wallet',
  templateUrl: './friend-wallet.component.html',
  styleUrls: ['./friend-wallet.component.css']
})
export class FriendWalletComponent implements OnInit, OnDestroy
{

  private _subscription!: Subscription
  searchedFriends!: Friend[] | null;
  friends!: Friend[];
  wallets!: Wallet[];
  friend!: Friend;
  friendWallets!: Wallet[];
  searchText!: string;
  errorMessage: string = '';
  showProgressBar: boolean = false;
  showSubmitButton: boolean = true;
  transferFromId: number = 0;
  transferToId: number = 0;
  isSubmitted: boolean = false;
  isFriendHidden: boolean = false;

  constructor
  (
    private _friendService: FriendService,
    private _walletService: WalletService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getAllFriendsOfUser();
    this.getAllUserWallet();
    // console.log(this.friendRequestChecker(2));

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
    this.getAllWalletOfUser(user_id);
    this.getAllInfoOfUser(user_id);
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }
}
