// generally needed
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// for Two-Way-Binding (ngModel directive)
import {FormsModule} from '@angular/forms';
// for routing
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';

// for bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NavbarComponent} from './components/header/navbar/navbar.component';
import {LoginComponent} from './components/header/login/login.component';
import {HomePageComponent} from './components/home-page/home-page';
import {AdminPageComponent} from './components/admin-page/admin-page';
import {ProductPageComponent} from './components/product-page/product-page';
import {ShoppingCartPageComponent} from './components/shoppingCart-page/shoppingCart-page';
import {UserPageComponent} from './components/user-page/user-page';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'products', component: ProductPageComponent},
  {path: 'cart', component: ShoppingCartPageComponent},
  {path: 'account', component: UserPageComponent},
  {path: 'admin', component: AdminPageComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    AdminPageComponent,
    ProductPageComponent,
    ShoppingCartPageComponent,
    UserPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    // register routes in app
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
