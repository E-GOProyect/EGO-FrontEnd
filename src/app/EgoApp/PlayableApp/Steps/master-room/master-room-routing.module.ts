import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgressBarModule } from 'src/app/Common/components';
import { MasterRoomComponent } from './master-room.component';

const routes: Routes = [
  {
    path:'',
    component:MasterRoomComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoomRoutingModule { }
