import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewFormRoutingModule } from './review-form-routing.module';
import { ReviewFormComponent } from './review-form.component';
import { LoadingPageModule } from 'src/app/Common/components';


@NgModule({
  declarations: [
    ReviewFormComponent,
  ],
  imports: [
    CommonModule,
    ReviewFormRoutingModule,
    LoadingPageModule
  ]
})
export class ReviewFormModule { }
