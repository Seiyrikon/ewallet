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
  requests!: Friend[] | null;
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
    this.getAllFriendRequest();
  }

  getAllFriendRequest(): any {
      this.showProgressBar = true;
      const requests$ = this._friendService.getAllFriendRequest();

      requests$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
          this.requests = response.message[0];
          this.errorMessage = ''
        },
        (error) => {
          console.error('An error occured', error);
          this.errorMessage = error;
          this.showProgressBar = false;
          this.requests = null
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
