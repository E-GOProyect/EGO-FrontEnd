import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterNavigate } from 'src/app/Common/enums';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: RouterNavigate.QUESTION_STEP,
        loadChildren: () =>
          import('./Steps/question/question.module').then(
            (m) => m.QuestionModule
          ),
      },
      {
        path: RouterNavigate.QUESTION_AWAIT_STEP,
        loadChildren: () =>
          import('./Steps/question-await/question-await.module').then(
            (m) => m.QuestionAwaitModule
          ),
      },
      {
        path: RouterNavigate.RESULT,
        loadChildren: () =>
          import('./Steps/result/result.module').then((m) => m.ResultModule),
      },
      {
        path: RouterNavigate.WAITING_ROOM,
        loadChildren: () =>
          import('./Steps/waiting-room/waiting-room.module').then(
            (m) => m.WaitingRoomModule
          ),
      },
      {
        path: RouterNavigate.FINAL_STEP,
        loadChildren: () =>
          import('./Steps/final-step/final-step.module').then(
            (m) => m.FinalStepModule
          ),
      },
      {
        path: RouterNavigate.CHATROOM,
        loadChildren: () =>
          import('./chat-room/chat-room.module').then((m) => m.ChatRoomModule),
      },
      {
        path: RouterNavigate.MASTER_ROOM,
        loadChildren: () =>
          import('./Steps/master-room/master-room.module').then((m) => m.MasterRoomModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayableAppRoutingModule {}
