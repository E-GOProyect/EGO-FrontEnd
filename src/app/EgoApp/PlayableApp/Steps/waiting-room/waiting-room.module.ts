import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingRoomRoutingModule } from './waiting-room-routing.module';
import { WaitingRoomComponent } from './waiting-room.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { LoadingPageModule } from 'src/app/Common/components/loading-page';


@NgModule({
  declarations: [
    WaitingRoomComponent
  ],
  imports: [
    CommonModule,
    WaitingRoomRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    LoadingPageModule
  ]
})
export class WaitingRoomModule { }
