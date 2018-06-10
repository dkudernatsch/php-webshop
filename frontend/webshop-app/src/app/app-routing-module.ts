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
import {AdminAuthGuard} from './admin-auth-guard.service';
import {UserAuthGuard} from './user-auth-guard.service';
import {NotAdminAuthGuard} from './not-admin-auth-guard';
import {AdminUserDetailsComponent} from './components/admin-page/manage-users-page/admin-user-details/admin-user-details.component';
import {AdminUserListComponent} from './components/admin-page/manage-users-page/admin-user-list/admin-user-list.component';
import {ManageAccountPageComponent} from "./components/user-page/manage-account-page/manage-account-page";
import {ManagePaymentPageComponent} from "./components/user-page/manage-payment-page/manage-payment-page";
import {ManageCouponPageComponent} from "./components/user-page/manage-coupon-page/manage-coupon-page";

// set up the routes
const appRoutes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'products', canActivate: [NotAdminAuthGuard], component: ProductPageComponent},
    {path: 'cart', canActivate: [NotAdminAuthGuard], component: ShoppingCartPageComponent},
    {
        path: 'account',
        canActivate: [UserAuthGuard],
        component: UserPageComponent,
        canActivateChild: [UserAuthGuard],
        children: [
            {path: 'user-data', component: ManageAccountPageComponent},
            {path: 'coupon', component: ManageCouponPageComponent},
            {path: 'payment', component: ManagePaymentPageComponent},
            {path: '', redirectTo: 'user-data', pathMatch: 'full'},
        ]
    },
    {
        path: 'admin',
        canActivate: [AdminAuthGuard],
        canActivateChild: [AdminAuthGuard],
        component: AdminPageComponent,
        children: [
            {path: 'products', component: ManageProductsPageComponent},
            {path: 'coupons', component: ManageCouponsPageComponent},
            {
                path: 'users', component: ManageUsersPageComponent, children: [
                    {path: '', component: AdminUserListComponent},
                    {path: ':id', component: AdminUserDetailsComponent}
                ]
            },
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
