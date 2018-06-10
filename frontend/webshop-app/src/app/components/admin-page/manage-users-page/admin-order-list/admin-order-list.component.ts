import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../types/api/user';
import { Observable } from 'rxjs';
import {delay, flatMap, map, switchMap, tap, zipAll} from 'rxjs/operators';
import { InvoiceEndpointService } from '../../../../services/api/InvoiceEndpointService';
import { Product } from '../../../../types/api/product';
import { zip, of, forkJoin } from 'rxjs';
import { ProductEndpointService } from '../../../../services/api/product-endpoint.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserEndpointService } from '../../../../services/api/user-endpoint-service';
import {Invoice} from '../../../../types/api/order';

@Component({
    selector: 'app-admin-order-list',
    templateUrl: './admin-order-list.component.html',
})
export class AdminOrderListComponent implements OnInit {

    public user$: Observable<User>;
    public invoices$: Observable<Invoice[]>;

    constructor(public invoiceService: InvoiceEndpointService,
        public productService: ProductEndpointService,
        public userService: UserEndpointService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.user$ = this.route.params
            .pipe(
                map((params: Params) => +params['id']),
                switchMap((id: number) => this.userService.byId(id)),
        );
        this.invoices$ = this.fetchInvoices();
    }

    fetchInvoices() {
        return this.user$.pipe(
            switchMap((user) => this.invoiceService.allByUser(user.id)),
        );
    }

    removeOrderPos(invoice_id: number, order_pos_id: number) {
        this.invoiceService.removeOrderPosition(invoice_id, order_pos_id)
            .subscribe(() => {
                this.invoices$ = this.fetchInvoices();
            });
    }

}
