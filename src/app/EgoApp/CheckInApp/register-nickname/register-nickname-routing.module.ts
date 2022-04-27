import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegisterNicknameComponent } from './register-nickname.component'

const routes: Routes = [
  {
    path: '',
    component: RegisterNicknameComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterNicknameRoutingModule {}
