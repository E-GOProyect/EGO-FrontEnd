import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckInRoutingModule } from './check-in-routing.module';
import { CheckInComponent } from './check-in.component';


@NgModule({
  declarations: [
    CheckInComponent,
  ],
  imports: [
    CommonModule,
    CheckInRoutingModule
  ]
})
export class CheckInModule { }
