import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RouterNavigate } from './Common/enums'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: RouterNavigate.CHECK_IN_APP,
        loadChildren: () =>
          import('./EgoApp/CheckInApp/check-in-app.module').then(
            (m) => m.CheckInAppModule
          ),
      },
      {
        path: RouterNavigate.CREATE_FORMS,
        loadChildren: () =>
          import('./EgoApp/CreateFormsApp/create-forms-app.module').then(
            (m) => m.CreateFormsAppModule
          ),
      },
      {
        path: RouterNavigate.PLAYABLE_APP,
        loadChildren: () =>
          import('./EgoApp/PlayableApp/playable-app.module').then(
            (m) => m.PlayableAppModule
          ),
      },
    ],
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
