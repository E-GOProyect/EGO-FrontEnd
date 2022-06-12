import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckInRoutingModule } from './check-in-routing.module';
import { CheckInComponent } from './check-in.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CheckInComponent
  ],
  imports: [
    CommonModule,
    CheckInRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CheckInModule { }
