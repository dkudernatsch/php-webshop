// generally needed
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// for Two-Way-Binding (ngModel directive)
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {ProductComponent} from './components/product-page/product/product.component';
import {SearchProductComponent} from './components/product-page/searchbar/search-product.component';
import {CategoryPickerComponent} from './components/product-page/category-picker/category-picker.component';

import {AdminPageComponent} from './components/admin-page/admin-page';
import {ManageCouponsPageComponent} from './components/admin-page/manage-coupons-page/manage-coupons-page';
import {ManageProductsPageComponent} from './components/admin-page/manage-products-page/manage-products-page';
import {ManageUsersPageComponent} from './components/admin-page/manage-users-page/manage-users-page';

import {ShoppingCartPageComponent} from './components/shoppingCart-page/shoppingCart-page';
import {CartItemComponent} from './components/shoppingCart-page/cart-item/cart-item.component';
import {CartItemListComponent} from './components/shoppingCart-page/cart-item-list/cart-item-list.component';

import {UserPageComponent} from './components/user-page/user-page';

import {FooterComponent} from './components/footer/footer.component';

import {PageNotFoundPageComponent} from './components/page-not-found/page-not-found-page';
import {AuthService} from './services/auth/auth.service';
import {UserAuthService} from './services/auth/user-auth.service';
import {LocalStorageService} from './services/localstorage.service';
import {RequestCacheService} from './services/request-cache.service';
import {LoginService} from './services/auth/login.service';
import {TestloginComponent} from './components/testlogin/testlogin.component';
import {ShoppingCartService} from './services/products/shoppingCart.service';
import {ProductListComponent} from './components/product-page/productList/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthIntercepterService} from './services/auth/auth-intercepter.service';
import {PayingModalComponent} from './components/shoppingCart-page/payingModal/paying-modal.component';
import {PaymentEndpointService} from './services/api/payment-endpoint.service';
import {CreateProductModalComponent} from './components/admin-page/manage-products-page/create-product/create-product-modal';
import {CreateCouponComponent} from './components/admin-page/manage-coupons-page/create-coupon/create-coupon.component';
import {AdminEditProductModalComponent} from './components/admin-page/manage-products-page/edit-product/admin-edit-product.component';
import {AdminProductListComponent} from './components/admin-page/manage-products-page/product-list/admin-product-list.component';
import {AdminCouponListComponent} from './components/admin-page/manage-coupons-page/admin-coupon-list/admin-coupon-list.component';
import {AdminAuthGuard} from './admin-auth-guard.service';
import {UserAuthGuard} from './user-auth-guard.service';
import {NotAdminAuthGuard} from './not-admin-auth-guard';
import {UpdateFormComponent} from './components/user-page/manage-account-page/update-form/update-form.component';
import {PaymentMethodComponent} from './components/user-page/manage-payment-page/payment-method/payment-method.component';
import {PaymentMethodListComponent} from './components/user-page/manage-payment-page/payment-method-list/payment-method-list.component';
import {UserCouponListComponent} from "./components/user-page/manage-coupon-page/user-coupon-list/user-coupon-list.component";
import {RedeemCouponComponent} from "./components/user-page/manage-coupon-page/redeem-coupon/redeem-coupon.component";
import {ManageAccountPageComponent} from "./components/user-page/manage-account-page/manage-account-page";
import {ManageCouponPageComponent} from "./components/user-page/manage-coupon-page/manage-coupon-page";
import {ManagePaymentPageComponent} from "./components/user-page/manage-payment-page/manage-payment-page";
import {OrderEndpointService} from "./services/api/order-endpoint.service";
import { AdminUserListComponent } from './components/admin-page/manage-users-page/admin-user-list/admin-user-list.component';
import { AdminUserDetailsComponent } from './components/admin-page/manage-users-page/admin-user-details/admin-user-details.component';
import { AdminOrderListComponent } from './components/admin-page/manage-users-page/admin-order-list/admin-order-list.component';
import {InvoiceEndpointService} from './services/api/InvoiceEndpointService';
import { PasswordVerificationModalComponent } from './components/user-page/password-verification-modal/password-verification-modal.component';
import {RegisterModalComponent} from "./components/header/register-modal/register-modal.component";
import {MessageModalService} from "./services/message-modal/message-modal.service";
import {MessageModalComponent} from "./components/message-modal/message-modal.component";
import {ManageOrderPageComponent} from "./components/user-page/manage-order-page/manage-order-page";
import { UserOrderListComponent } from './components/user-page/manage-order-page/user-order-list/user-order-list.component';


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
        SearchProductComponent,
        CategoryPickerComponent,
        ProductComponent,
        ProductListComponent,
        ShoppingCartPageComponent,
        CreateProductModalComponent,
        CartItemComponent,
        CartItemListComponent,
        PayingModalComponent,
        PageNotFoundPageComponent,
        UserPageComponent,
        LoginComponent,
        FooterComponent,
        TestloginComponent,
        CreateCouponComponent,
        AdminCouponListComponent,
        TestloginComponent,
        AdminProductListComponent,
        AdminEditProductModalComponent,
        UpdateFormComponent,
        PaymentMethodComponent,
        PaymentMethodListComponent,
        UserCouponListComponent,
        RedeemCouponComponent,
        ManageAccountPageComponent,
        ManageCouponPageComponent,
        ManagePaymentPageComponent,
        AdminUserListComponent,
        AdminUserDetailsComponent,
        AdminOrderListComponent,
        PasswordVerificationModalComponent,
        RegisterModalComponent,
        MessageModalComponent,
        ManageOrderPageComponent,
        UserOrderListComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthService,
        UserAuthService,
        LocalStorageService,
        RequestCacheService,
        LoginService,
        ShoppingCartService,
        PaymentEndpointService,
        AdminAuthGuard,
        UserAuthGuard,
        NotAdminAuthGuard,
        InvoiceEndpointService,
        OrderEndpointService,
        MessageModalService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepterService, multi: true}
    ],
    entryComponents: [
        CreateProductModalComponent,
        AdminEditProductModalComponent,
        PayingModalComponent,
        PasswordVerificationModalComponent,
        RegisterModalComponent,
        MessageModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
