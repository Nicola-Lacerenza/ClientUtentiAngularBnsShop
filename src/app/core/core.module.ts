import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    JumbotronComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    JumbotronComponent
  ]
})
export class CoreModule { }
