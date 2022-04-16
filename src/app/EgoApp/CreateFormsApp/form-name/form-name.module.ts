import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormNameRoutingModule } from './form-name-routing.module';
import { FormNameComponent } from './form-name.component';


@NgModule({
  declarations: [
    FormNameComponent,
  ],
  imports: [
    CommonModule,
    FormNameRoutingModule
  ]
})
export class FormNameModule { }
