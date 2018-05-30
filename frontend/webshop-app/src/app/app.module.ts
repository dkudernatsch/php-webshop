// generally needed
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// for Two-Way-Binding (ngModel directive)
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

// for bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NavbarComponent} from './components/home-page/navbar/navbar.component';
import {NavComponent} from './components/home-page/nav/nav.component';
import {LoginComponent} from './components/home-page/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
