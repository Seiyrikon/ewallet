import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Friend } from 'src/app/interface/friend';
import { FriendService } from 'src/app/service/friend/friend.service';

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

  constructor
  (
    private _friendService: FriendService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getAllConfirmRequest();
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
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }
}
