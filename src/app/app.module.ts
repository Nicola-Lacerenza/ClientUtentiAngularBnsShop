import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorComponent } from './components/error/error.component';
import { ArticoliComponent } from './components/articoli/articoli.component';
import { CartComponent } from './components/cart/cart.component'; 
import { CoreModule } from './core/core.module';
import { LogoutComponent } from './components/logout/logout.component';
import { GridArticoliComponent } from './components/grid-articoli/grid-articoli.component';
import { ArticoliCardComponent } from './componentParts/articoli-card/articoli-card.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { PdpComponent } from './components/pdp/pdp.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { SizeSelectorComponent } from './components/size-selector/size-selector.component';
import { AddProductComponent } from './components/add-product/add-product';
import { corsInterceptor } from './cors.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    ErrorComponent,
    ArticoliComponent,
    LogoutComponent,
    GridArticoliComponent,
    CartComponent,
    ArticoliCardComponent,
    NewUserComponent,
    SizeSelectorComponent,
    PdpComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [provideHttpClient(withInterceptors([corsInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
