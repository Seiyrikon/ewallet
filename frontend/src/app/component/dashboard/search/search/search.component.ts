import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Friend } from 'src/app/interface/friend';
import { User } from 'src/app/interface/user';
import { FriendService } from 'src/app/service/friend/friend.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy
{
  private _subscription!: Subscription
  searchedFriends!: Friend[] | null;
  allUserInfo!: User[];
  friends!: Friend[];
  searchText!: string;
  errorMessage: string = '';
  showProgressBar: boolean = false;

  constructor
  (
    private _friendService: FriendService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getAllUserInfo();
  }

  getAllUserInfo(): any {
    this.showProgressBar = true;
    const allUserInfo$ = this._userService.getAllUserInfo();

    allUserInfo$.subscribe
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
      this.getAllUserInfo();
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
          this.searchUserByUsername();
        }
      )
    }
    else
    {
      console.error('No search data found in the route');
    }
  }

  onCancel(friendId: number)
  {
    console.log(friendId);
    if(friendId)
    {
      this.showProgressBar = true;
      const cancelFriend$ = this._friendService.cancelFriendRequest(+friendId);

      cancelFriend$.subscribe
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
          this.searchUserByUsername();
        }
      )
    }
    else
    {
      console.error('No search data found in the route');
    }
  }

  onChat(friendId: number):any
  {
    console.log(friendId);
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['chat', 'session', `${friendId}`] } }]);
  }

  getSanitizedImage(image: any): any {
    // Assuming profilePicture is a base64 string
    const imageSrc = `data:image/png;base64,${image}`;
    return this._sanitizer.bypassSecurityTrustResourceUrl(imageSrc);
  }

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }
}
