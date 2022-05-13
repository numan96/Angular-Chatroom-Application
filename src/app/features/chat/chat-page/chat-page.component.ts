import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  ChannelService,
  ChatClientService,
  StreamI18nService,
} from 'stream-chat-angular';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit {
  chatIsReady$!: Observable<boolean>;

  constructor(
    private _chatService: ChatClientService,
    private _channelService: ChannelService,
    private _streamI18nService: StreamI18nService,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this._streamI18nService.setTranslation();
    this.chatIsReady$ = this._auth.getStreamToken().pipe(
      switchMap((streamToken) =>
        this._chatService.init(
          environment.stream.key,
          this._auth.getCurrentUser().uid,
          streamToken
        )
      ),
      switchMap(() =>
        this._channelService.init({
          type: 'messaging',
          members: { $in: [this._auth.getCurrentUser().uid] },
        })
      ),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
