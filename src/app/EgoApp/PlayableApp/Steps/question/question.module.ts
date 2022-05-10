import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question.component';


@NgModule({
  declarations: [
    QuestionComponent,
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    CountdownModule
  ]
})
export class QuestionModule { }
