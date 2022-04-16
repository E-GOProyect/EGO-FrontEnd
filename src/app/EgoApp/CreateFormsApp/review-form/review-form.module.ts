import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewFormRoutingModule } from './review-form-routing.module';
import { ReviewFormComponent } from './review-form.component';


@NgModule({
  declarations: [
    ReviewFormComponent,
  ],
  imports: [
    CommonModule,
    ReviewFormRoutingModule
  ]
})
export class ReviewFormModule { }
