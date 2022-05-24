import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalStepComponent } from './final-step.component';

const routes: Routes = [
  {
    path:'',
    component:FinalStepComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalStepRoutingModule { }
