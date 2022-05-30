import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingupRoutingModule } from './singup-routing.module';
import { SingupComponent } from './singup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SingupComponent,
  ],
  imports: [
    CommonModule,
    SingupRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SingupModule { }
