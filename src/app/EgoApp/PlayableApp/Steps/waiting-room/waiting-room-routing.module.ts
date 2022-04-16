import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaitingRoomComponent } from './waiting-room.component';

const routes: Routes = [
  {
    path:'',
    component: WaitingRoomComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitingRoomRoutingModule { }
