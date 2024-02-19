import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Friend } from 'src/app/interface/friend';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FriendService } from 'src/app/service/friend/friend.service';
import { ExpiredSessionComponent } from '../../common/expired-session/expired-session.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit, OnDestroy
{

  private _subscription!: Subscription
  confirmRequests!: Friend[] | null;
  searchText!: string;
  errorMessage: string = '';
  showProgressBar: boolean = false;
  session!: any;

  constructor
  (
    private _friendService: FriendService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _dialog: MatDialog,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isSessionExpired();
    this.getAllConfirmRequest();
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

  getAllConfirmRequest(): any {
      this.showProgressBar = true;
      const requests$ = this._friendService.getAllConfirmRequest();

      requests$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
          this.confirmRequests = response.message;
          this.errorMessage = ''
          console.log(response);

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

  onConfirm(friendId: number)
  {
    console.log(friendId);
    this.showProgressBar = true;
      const accept$ = this._friendService.acceptFriend(friendId);

      accept$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
          this.errorMessage = ''
          console.log(response);
        },
        (error) => {
          console.error('An error occured', error);
          this.errorMessage = error;
          this.showProgressBar = false;
          this.confirmRequests = null
          this.getAllConfirmRequest();
          console.log(this.confirmRequests);

        },
        () => {
          this.showProgressBar = false;
          this.errorMessage = ''
          this.confirmRequests = null
          this.getAllConfirmRequest();
        }
      )
  }
  onDecline(friendId: number)
  {
    console.log(friendId);
    this.showProgressBar = true;
      const accept$ = this._friendService.declineFriendRequest(friendId);

      accept$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
          this.errorMessage = ''
          console.log(response);
        },
        (error) => {
          console.error('An error occured', error);
          this.errorMessage = error;
          this.showProgressBar = false;
          this.confirmRequests = null
          this.getAllConfirmRequest();
          console.log(this.confirmRequests);

        },
        () => {
          this.showProgressBar = false;
          this.errorMessage = ''
          this.confirmRequests = null
          this.getAllConfirmRequest();
        }
      )
  }

  getSanitizedImage(image: any): any {
    // Assuming profilePicture is a base64 string
    const imageSrc = `data:image/png;base64,${image}`;
    return this._sanitizer.bypassSecurityTrustResourceUrl(imageSrc);
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
