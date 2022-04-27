import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { WaitingRoomRoutingModule } from './waiting-room-routing.module'
import { WaitingRoomComponent } from './waiting-room.component'

@NgModule({
  declarations: [WaitingRoomComponent],
  imports: [CommonModule, WaitingRoomRoutingModule],
})
export class WaitingRoomModule {}
