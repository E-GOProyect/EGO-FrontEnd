import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddQuestionRoutingModule } from './add-question-routing.module';
import { AddQuestionComponent } from './add-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddQuestionComponent,
  ],
  imports: [
    CommonModule,
    AddQuestionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AddQuestionModule { }
