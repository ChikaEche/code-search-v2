import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo, AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const redirectUnauthorized = () => {
  return redirectUnauthorizedTo(['/login'])
}

const redirectAuthorized = () => {
  return redirectLoggedInTo(['/'])
}

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    //canActivate: [AngularFireAuthGuard]
  },
  // {
  //   path: '', 
  //   component: DashboardComponent,
  //   //canActivate: [AngularFireAuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
