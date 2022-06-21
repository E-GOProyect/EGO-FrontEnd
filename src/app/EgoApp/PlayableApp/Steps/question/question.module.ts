import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question.component';
import { QuestionAwaitModule } from '../question-await/question-await.module';
import { LoadingPageModule } from 'src/app/Common/components';
import { ResultModule } from '../result/result.module';


@NgModule({
  declarations: [
    QuestionComponent,
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    CountdownModule,
    QuestionAwaitModule,
    LoadingPageModule,
    ResultModule,
  ]
})
export class QuestionModule { }
