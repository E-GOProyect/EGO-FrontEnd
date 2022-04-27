import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RegisterNicknameRoutingModule } from './register-nickname-routing.module'
import { RegisterNicknameComponent } from './register-nickname.component'

@NgModule({
  declarations: [RegisterNicknameComponent],
  imports: [CommonModule, RegisterNicknameRoutingModule],
})
export class RegisterNicknameModule {}
