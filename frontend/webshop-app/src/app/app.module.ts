// generally needed
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// for Two-Way-Binding (ngModel directive)
import {FormsModule} from '@angular/forms';
// for routing
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';

// for bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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

// set up the routes
const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'products', component: ProductPageComponent},
  {path: 'cart', component: ShoppingCartPageComponent},
  {path: 'account', component: UserPageComponent},
  {
    path: 'admin', component: AdminPageComponent, children: [
      {path: 'products', component: ManageProductsPageComponent},
      {path: 'coupons', component: ManageCouponsPageComponent},
      {path: 'users', component: ManageUsersPageComponent},
      {path: '', redirectTo: 'products', pathMatch: 'full'},
    ]
  },
  {path: 'not-found', component: PageNotFoundPageComponent},
  // has to be last entry!
  {path: '**', redirectTo: '/not-found'}
];


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
export class AppModule {
}
