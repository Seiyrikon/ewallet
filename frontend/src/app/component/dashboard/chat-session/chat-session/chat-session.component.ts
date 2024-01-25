import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatSession } from 'src/app/interface/chat-session';
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

  constructor
    (
      private _chatService: ChatService,
      private _route: ActivatedRoute,
      private _router: Router
    ) { }

  ngOnInit(): void {
    this.recipient_id = this._route.snapshot.paramMap.get('recipient_id');
    this.getChatSession();
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
          console.log(this.chatSession);

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
    console.log(recipient_id);
    this._router.navigate(['/dashboard', { outlets: { contentOutlet: ['chat', 'session', `${recipient_id}`] } }]);
  }

  onSend(message: string): any {
    console.log(message);
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

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
