import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RouterNavigate } from 'src/app/Common/enums'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: RouterNavigate.ADD_QUESTION,
        loadChildren: () =>
          import('./add-question/add-question.module').then(
            (m) => m.AddQuestionModule
          ),
      },
      {
        path: RouterNavigate.FORM_NAME,
        loadChildren: () =>
          import('./form-name/form-name.module').then((m) => m.FormNameModule),
      },
      {
        path: RouterNavigate.REVIEW_FORM,
        loadChildren: () =>
          import('./review-form/review-form.module').then(
            (m) => m.ReviewFormModule
          ),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFormsAppRoutingModule {}
