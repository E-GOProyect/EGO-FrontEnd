import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterNavigate } from 'src/app/Common/enums';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path: RouterNavigate.QUESTION_STEP,
        loadChildren: () => import('./Steps/question/question.module').then((m)=>m.QuestionModule),
      },
      {
        path: RouterNavigate.QUESTION_AWAIT_STEP,
        loadChildren: () => import('./Steps/question-await/question-await.module').then((m)=>m.QuestionAwaitModule),
      },
      {
        path: RouterNavigate.RESULT,
        loadChildren: ()=> import('./Steps/result/result.module').then((m)=>m.ResultModule),
      },
      {
        path: RouterNavigate.WAITING_ROOM,
        loadChildren: () => import('./Steps/waiting-room/waiting-room.module').then((m)=>m.WaitingRoomModule),
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayableAppRoutingModule { }