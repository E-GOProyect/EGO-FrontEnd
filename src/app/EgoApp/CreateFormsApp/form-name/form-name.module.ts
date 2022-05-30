import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormNameRoutingModule } from './form-name-routing.module';
import { FormNameComponent } from './form-name.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormNameComponent,
  ],
  imports: [
    CommonModule,
    FormNameRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class FormNameModule { }
