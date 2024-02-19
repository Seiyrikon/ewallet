import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExpiredSessionComponent } from 'src/app/component/common/expired-session/expired-session.component';
import { ChatSession } from 'src/app/interface/chat-session';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ChatService } from 'src/app/service/chat/chat.service';

@Component({
  selector: 'app-chat-session',
  templateUrl: './chat-session.component.html',
  styleUrls: ['./chat-session.component.css']
})
export class ChatSessionComponent implements OnInit, OnDestroy {
  private _subscription!: Subscription
  chatSession!: ChatSession[];
  errorMessage: string = '';
  showProgressBar: boolean = false;
  recipient_id!: any;
  chatText!: string;
  session!: any;

  constructor
    (
      private _chatService: ChatService,
      private _route: ActivatedRoute,
      private _router: Router,
      private _sanitizer: DomSanitizer,
      private _dialog: MatDialog,
      private _authService: AuthService
    ) { }

  ngOnInit(): void {
    this.isSessionExpired();
    this.recipient_id = this._route.snapshot.paramMap.get('recipient_id');
    this.getChatSession();
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
      }
    )
  }

  getChatSession(): any {
    this.showProgressBar = true;
    const chatSession$ = this._chatService.getChatSession(+this.recipient_id);

    chatSession$.subscribe
      (
        (response) => {
          if (!response) {
            console.error('Response is empty');
          }
          this.chatSession = response.message;
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

  onChatSession(recipient_id: number): any {
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['chat', 'session', `${recipient_id}`] } }]);
  }

  onSend(message: string): any {
    this.errorMessage = '';
    this.showProgressBar = true; // Show the progress bar
    const sendMessage$ = this._chatService.sendChat(+this.recipient_id, message);

    sendMessage$.subscribe
      (
        (response) => {
          if (!response) {
            console.error('Response is empty');

          }
        },
        (error) => {
          console.error('Send failed', error);
          this.showProgressBar = false;
          this.errorMessage = error;
        },
        () => {
          // Upon completion of wallet creation (when the observable completes)
          this.showProgressBar = false; // Hide the progress bar
          this.getChatSession();
          this.chatText = "";
        }
      );
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
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
