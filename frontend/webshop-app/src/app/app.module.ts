import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// for bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TokenService} from "./core/token.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
