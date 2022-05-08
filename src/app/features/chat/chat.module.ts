import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  imports: [CommonModule, ChatRoutingModule],
  exports: [],
  declarations: [ChatPageComponent],
  providers: [],
})
export class ChatModule {}
