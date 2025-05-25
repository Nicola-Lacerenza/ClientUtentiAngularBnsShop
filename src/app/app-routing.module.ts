import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorComponent } from './components/error/error.component';
import { ArticoliComponent } from './components/articoli/articoli.component';
import { LogoutComponent } from './components/logout/logout.component';
import { GridArticoliComponent } from './components/grid-articoli/grid-articoli.component';
import { authGuard } from './services/auth.guard';
import { NewUserComponent } from './components/new-user/new-user.component';
import { PdpComponent } from './components/pdp/pdp.component';
import { CartComponent } from './components/cart/cart.component';
import { SizeSelectorComponent } from './components/size-selector/size-selector.component';
import { AddProductComponent } from './components/add-product/add-product';
import { roleGuard } from './services/role-guard.guard';
import { MemberComponent } from './components/member/member.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddCodicescontoComponent } from './components/add-codicesconto/add-codicesconto.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { CheckoutFailureComponent } from './components/checkout-failure/checkout-failure.component';
import { ListaOrdiniComponent } from './components/lista-ordini/lista-ordini.component';
import { RichiestaResoComponent } from './components/richiesta-reso/richiesta-reso.component';
import { GestioneOrdiniAdminComponent } from './components/gestione-ordini-admin/gestione-ordini-admin.component';
import { RiceviCodiceGoogleComponent } from './components/ricevi-codice-google/ricevi-codice-google.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';

const routes: Routes = [
  {path:'',component:WelcomeComponent},
  {path:'login',component:LoginComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'new-user',component:NewUserComponent},
  {path:'articoli',component:ArticoliComponent},
  {path:'grid',component:GridArticoliComponent, canActivate:[authGuard,roleGuard]},
  {path:'pdp/:id',component:PdpComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'checkout-success',component:CheckoutSuccessComponent},
  {path:'checkout-failure',component:CheckoutFailureComponent},
  {path:'addProduct', component: AddProductComponent, canActivate:[authGuard,roleGuard]},
  {path:'addCodiceSconto', component: AddCodicescontoComponent, canActivate:[authGuard,roleGuard]},
  {path:'member', component: MemberComponent, canActivate:[authGuard,roleGuard],children:[
    {path:'listaOrdini', component: ListaOrdiniComponent},
    {path:'reso/:id', component: RichiestaResoComponent}
  ]},
  {path:'gestioneOrdini', component: GestioneOrdiniAdminComponent, canActivate:[authGuard,roleGuard]},
  {path:'addProduct/:id', component: AddProductComponent, canActivate:[authGuard,roleGuard]},
  {path:'cart',component:CartComponent},
  {path:'size-selector',component:SizeSelectorComponent},
  {path:'logout',component:LogoutComponent},
  {path:'ricevi-codice-google',component:RiceviCodiceGoogleComponent},
  {path:'login-google',component:GoogleLoginComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
