import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Friend } from 'src/app/interface/friend';
import { FriendService } from 'src/app/service/friend/friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription
  friend!: Friend | null;
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
    throw new Error('Method not implemented.');
  }

  searchUserByUsername(): any {
    if(this.searchText)
    {
      this.showProgressBar = true;
      const friend$ = this._friendService.searchUserByUsername(this.searchText);

      friend$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
          this.friend = response.message[0];
          this.errorMessage = ''
        },
        (error) => {
          console.error('An error occured', error);
          this.errorMessage = error;
          this.showProgressBar = false;
          this.friend = null
        },
        () => {
          this.showProgressBar = false;
          this.errorMessage = ''
        }
      )
    }
    else
    {
      console.error('No search data found in the route');
    }
  }

  onSearch(): void {
    console.log('Searched Text:', this.searchText);
    this.searchUserByUsername();
  }

  onAdd(friendId: number)
  {
    console.log(friendId);
    if(friendId)
    {
      this.showProgressBar = true;
      const friend$ = this._friendService.addFriend(+friendId);

      friend$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
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
        }
      )
    }
    else
    {
      console.error('No search data found in the route');
    }
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }
}
