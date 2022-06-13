import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingRoomRoutingModule } from './waiting-room-routing.module';
import { WaitingRoomComponent } from './waiting-room.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    WaitingRoomComponent,
  ],
  imports: [
    CommonModule,
    WaitingRoomRoutingModule,
    FontAwesomeModule,
  ]
})
export class WaitingRoomModule { }
