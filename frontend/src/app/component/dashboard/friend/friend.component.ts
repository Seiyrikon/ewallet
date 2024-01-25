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
        }
      )
  }

  onChat(friendId: number):any
  {
    console.log(friendId);
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['chat', 'session', `${friendId}`] } }]);
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }
}
