// generally needed
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// for Two-Way-Binding (ngModel directive)
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';

// for bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import our own app-routing module (outsourced)
import {AppRoutingModule} from './app-routing-module';

// comps for header
import {NavbarComponent} from './components/header/navbar/navbar.component';
import {LoginComponent} from './components/header/login/login.component';

import {HomePageComponent} from './components/home-page/home-page';

import {ProductPageComponent} from './components/product-page/product-page';

import {AdminPageComponent} from './components/admin-page/admin-page';
import {ManageCouponsPageComponent} from './components/admin-page/manage-coupons-page/manage-coupons-page';
import {ManageProductsPageComponent} from './components/admin-page/manage-products-page/manage-products-page';
import {ManageUsersPageComponent} from './components/admin-page/manage-users-page/manage-users-page';

import {ShoppingCartPageComponent} from './components/shoppingCart-page/shoppingCart-page';

import {UserPageComponent} from './components/user-page/user-page';

import {PageNotFoundPageComponent} from './components/page-not-found/page-not-found-page';
import {AuthService} from './services/auth/auth.service';
import {UserAuthService} from './services/auth/user-auth.service';
import {LocalStorageService} from './services/localstorage.service';
import {RequestCacheService} from './services/request-cache.service';
import {LoginService} from './services/auth/login.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TestloginComponent } from './components/testlogin/testlogin.component';
import {AuthIntercepterService} from './services/auth/auth-intercepter.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    AdminPageComponent,
    ManageCouponsPageComponent,
    ManageProductsPageComponent,
    ManageUsersPageComponent,
    ProductPageComponent,
    ShoppingCartPageComponent,
    PageNotFoundPageComponent,
    UserPageComponent,
    LoginComponent,
    TestloginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
      AuthService,
      UserAuthService,
      LocalStorageService,
      RequestCacheService,
      LoginService,
      {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepterService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
