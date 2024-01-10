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
  searchedFriends!: Friend[] | null;
  friends!: Friend[];
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
    this.getAllFriendsOfUser();
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
        }
      )
  }

  searchUserByUsername(): any {
    if(this.searchText)
    {
      this.showProgressBar = true;
      const searchedFriends$ = this._friendService.searchUserByUsername(this.searchText);

      searchedFriends$.subscribe
      (
        (response) => {
          if(!response)
          {
            console.error('Response is empty');
          }
          this.searchedFriends = response.message;
          this.errorMessage = ''
        },
        (error) => {
          console.error('An error occured', error);
          this.errorMessage = error;
          this.showProgressBar = false;
          this.searchedFriends = null
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
