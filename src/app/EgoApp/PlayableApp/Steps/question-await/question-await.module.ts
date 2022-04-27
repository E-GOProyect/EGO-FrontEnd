import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { QuestionAwaitRoutingModule } from './question-await-routing.module'
import { QuestionAwaitComponent } from './question-await.component'

@NgModule({
  declarations: [QuestionAwaitComponent],
  imports: [CommonModule, QuestionAwaitRoutingModule],
})
export class QuestionAwaitModule {}
