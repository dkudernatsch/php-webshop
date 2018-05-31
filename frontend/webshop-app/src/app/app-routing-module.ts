import {NgModule} from '@angular/core';
// for routing
import {RouterModule, Routes} from '@angular/router';

import {UserPageComponent} from './components/user-page/user-page';
import {ManageCouponsPageComponent} from './components/admin-page/manage-coupons-page/manage-coupons-page';
import {ShoppingCartPageComponent} from './components/shoppingCart-page/shoppingCart-page';
import {HomePageComponent} from './components/home-page/home-page';
import {AdminPageComponent} from './components/admin-page/admin-page';
import {ManageUsersPageComponent} from './components/admin-page/manage-users-page/manage-users-page';
import {PageNotFoundPageComponent} from './components/page-not-found/page-not-found-page';
import {ProductPageComponent} from './components/product-page/product-page';
import {ManageProductsPageComponent} from './components/admin-page/manage-products-page/manage-products-page';

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
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
