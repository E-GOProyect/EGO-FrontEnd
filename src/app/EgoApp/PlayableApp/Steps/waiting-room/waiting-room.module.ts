import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingRoomRoutingModule } from './waiting-room-routing.module';
import { WaitingRoomComponent } from './waiting-room.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    WaitingRoomComponent,
  ],
  imports: [
    CommonModule,
    WaitingRoomRoutingModule,
    FontAwesomeModule,
    HttpClientModule,

  ]
})
export class WaitingRoomModule { }
