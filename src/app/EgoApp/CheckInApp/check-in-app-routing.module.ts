import { RouterNavigate } from './../../Common/enums/router-navigate.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:RouterNavigate.CHECK_IN,
        loadChildren: () => import('./check-in/check-in.module').then((m)=> m.CheckInModule),
      },
      {
        path:RouterNavigate.LOGIN,
        loadChildren: () => import('./login/login.module').then((m)=>m.LoginModule),
      },
      {
        path: RouterNavigate.GUEST_USERNAME,
        loadChildren: () => import('./register-nickname/register-nickname.module').then((m)=>m.RegisterNicknameModule),
      },
      {
        path: RouterNavigate.SIGN_UP,
        loadChildren: () => import('./singup/singup.module').then((m)=>m.SingupModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckInAppRoutingModule { }
