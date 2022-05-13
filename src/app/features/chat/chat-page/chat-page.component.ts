import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  ChannelActionsContext,
  ChannelService,
  ChatClientService,
  CustomTemplatesService,
  StreamI18nService,
} from 'stream-chat-angular';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit, AfterViewInit {
  chatIsReady$!: Observable<boolean>;

  @ViewChild('channelActionsTemplate')
  private _channelActionsTemplate!: TemplateRef<ChannelActionsContext>;

  constructor(
    private _chatService: ChatClientService,
    private _channelService: ChannelService,
    private _streamI18nService: StreamI18nService,
    private _auth: AuthService,
    private _customTemplatesService: CustomTemplatesService
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

  ngAfterViewInit(): void {
    this._customTemplatesService.channelActionsTemplate$.next(
      this._channelActionsTemplate
    );
  }

  onCreate(name: string) {
    const dashName = name.replace(/\s+/g, '-').toLowerCase();
    const channel = this._chatService.chatClient.channel(
      'messaging',
      dashName,
      {
        name: name,
        members: [this._auth.getCurrentUser().uid],
      }
    );
    from(channel.create());
  }
}
