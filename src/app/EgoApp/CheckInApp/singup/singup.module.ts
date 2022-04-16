import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingupRoutingModule } from './singup-routing.module';
import { SingupComponent } from './singup.component';


@NgModule({
  declarations: [
    SingupComponent,
  ],
  imports: [
    CommonModule,
    SingupRoutingModule
  ]
})
export class SingupModule { }
