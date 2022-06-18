import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoomRoutingModule } from './master-room-routing.module';
import { ProgressBarComponent, ProgressBarModule } from 'src/app/Common/components';
import { MasterRoomComponent } from './master-room.component';


@NgModule({
  declarations: [ MasterRoomComponent ],
  imports: [
    CommonModule,
    ProgressBarModule,
    MasterRoomRoutingModule,
  ],
  providers: [ ProgressBarComponent]
})
export class MasterRoomModule { }
