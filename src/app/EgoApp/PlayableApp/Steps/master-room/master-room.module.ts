import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoomRoutingModule } from './master-room-routing.module';
import { LoadingPageModule, ProgressBarComponent, ProgressBarModule } from 'src/app/Common/components';
import { MasterRoomComponent } from './master-room.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ MasterRoomComponent ],
  imports: [
    CommonModule,
    ProgressBarModule,
    MasterRoomRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    LoadingPageModule
  ],
  providers: [ ProgressBarComponent]
})
export class MasterRoomModule { }
