import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";
import {authGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/feat-login/feat-login.module').then(m => m.LoginModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./features/feat-calendar/feat-calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/feat-admin-panel/feat-admin.module').then(m => m.FeatAdminModule),
    canActivate: [authGuard]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '',
    redirectTo: '/calendar',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
