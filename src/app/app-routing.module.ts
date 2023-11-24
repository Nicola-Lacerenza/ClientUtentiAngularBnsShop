import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorComponent } from './components/error/error.component';
import { ArticoliComponent } from './components/articoli/articoli.component';
import { LogoutComponent } from './components/logout/logout.component';
import { GridArticoliComponent } from './components/grid-articoli/grid-articoli.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'welcome/:userId',component:WelcomeComponent},
  {path:'articoli',component:ArticoliComponent},
  {path:'articoli/grid',component:GridArticoliComponent},
  {path:'logout',component:LogoutComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
