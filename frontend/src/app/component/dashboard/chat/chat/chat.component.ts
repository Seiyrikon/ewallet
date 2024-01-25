import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatHistory } from 'src/app/interface/chat-history';
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

  constructor
  (
    private _chatService: ChatService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getChatHistory();
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

  ngOnDestroy(): void {
    if(this._subscription)
    {
      this._subscription.unsubscribe();
    }
  }
}
