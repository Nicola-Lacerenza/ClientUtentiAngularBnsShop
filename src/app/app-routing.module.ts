import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorComponent } from './components/error/error.component';
import { ArticoliComponent } from './components/articoli/articoli.component';
import { LogoutComponent } from './components/logout/logout.component';
import { GridArticoliComponent } from './components/grid-articoli/grid-articoli.component';
import { authGuard, authGuard1 } from './services/auth.guard';
import { NewUserComponent } from './components/new-user/new-user.component';
import { PdpComponent } from './components/pdp/pdp.component';

const routes: Routes = [
  {path:'',component:WelcomeComponent},
  {path:'login',component:LoginComponent},
  {path:'welcome/:userId',component:WelcomeComponent},
  {path:'new-user',component:NewUserComponent},
  {path:'articoli',component:ArticoliComponent, canActivate:[authGuard]},
  {path:'grid',component:GridArticoliComponent, canActivate:[authGuard]},
  {path:'pdp',component:PdpComponent,canActivate:[authGuard]},
  {path:'logout',component:LogoutComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
