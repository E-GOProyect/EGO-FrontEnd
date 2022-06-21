import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterNicknameRoutingModule } from './register-nickname-routing.module';
import { RegisterNicknameComponent } from './register-nickname.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterNicknameComponent,
  ],
  imports: [
    CommonModule,
    RegisterNicknameRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterNicknameModule { }
