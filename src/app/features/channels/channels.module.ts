import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StreamChatModule } from 'stream-chat-angular';
import { InviteButtonComponent } from './invite-button/invite-button.component';
import { NewChannelComponent } from './new-channel/new-channel.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    StreamChatModule,
    MatAutocompleteModule,
  ],
  exports: [NewChannelComponent, InviteButtonComponent],
  declarations: [NewChannelComponent, InviteButtonComponent],
  providers: [],
})
export class ChannelsModule {}
