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
import {CreateProductModalComponent} from './components/admin-page/manage-products-page/create-product-modal';


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
        AdminEditProductModalComponent
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
        {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepterService, multi: true}
    ],
    entryComponents: [
        CreateProductModalComponent,
        AdminEditProductModalComponent,
        PayingModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
