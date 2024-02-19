import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExpiredSessionComponent } from 'src/app/component/common/expired-session/expired-session.component';
import { ChatHistory } from 'src/app/interface/chat-history';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ChatService } from 'src/app/service/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy
{

  private _subscription!: Subscription
  chatHistory!: ChatHistory[];
  errorMessage: string = '';
  showProgressBar: boolean = false;
  session!: any;

  constructor
  (
    private _chatService: ChatService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _dialog: MatDialog,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isSessionExpired();
    this.getChatHistory();
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

  getChatHistory(): any {
    this.showProgressBar = true;
    const chatHistory$ = this._chatService.getChatHistory();

    chatHistory$.subscribe
    (
      (response) => {
        if(!response)
        {
          console.error('Response is empty');
        }
        this.chatHistory = response.message;
        this.errorMessage = ''
        console.log(this.chatHistory);

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

  onChatSession(recipient_id: number): any
  {
    console.log(recipient_id);
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['chat', 'session', `${recipient_id}`] } }]);
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
