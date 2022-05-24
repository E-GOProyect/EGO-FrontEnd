import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalStepRoutingModule } from './final-step-routing.module';
import { FinalStepComponent } from './final-step.component';


@NgModule({
  declarations: [
    FinalStepComponent
  ],
  imports: [
    CommonModule,
    FinalStepRoutingModule
  ]
})
export class FinalStepModule { }
