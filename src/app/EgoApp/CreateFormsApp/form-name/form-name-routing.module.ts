import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FormNameComponent } from './form-name.component'

const routes: Routes = [
  {
    path: '',
    component: FormNameComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormNameRoutingModule {}
