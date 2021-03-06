import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import {
  StreamChatModule,
  StreamAutocompleteTextareaModule,
} from 'stream-chat-angular';
import { ChannelsModule } from '../channels/channels.module';
@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    TranslateModule.forChild(),
    StreamChatModule,
    StreamAutocompleteTextareaModule,
    ChannelsModule,
  ],
  exports: [],
  declarations: [ChatPageComponent],
  providers: [],
})
export class ChatModule {}
