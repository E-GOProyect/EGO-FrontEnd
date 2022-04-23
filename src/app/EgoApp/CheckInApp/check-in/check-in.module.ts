import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckInRoutingModule } from './check-in-routing.module';
import { CheckInComponent } from './check-in.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    CheckInComponent
  ],
  imports: [
    CommonModule,
    CheckInRoutingModule,
    FontAwesomeModule
  ]
})
export class CheckInModule { }
