import {Component, OnInit, ViewChild} from '@angular/core';
import {UserAuthService} from "../../../../services/auth/user-auth.service";
import {Observable} from "rxjs/index";
import {User} from "../../../../types/api/user";
import {Invoice} from "../../../../types/api/order";
import {InvoiceEndpointService} from "../../../../services/api/InvoiceEndpointService";
import {switchMap} from "rxjs/internal/operators";

@Component({
    selector: 'app-user-order-list',
    templateUrl: './user-order-list.component.html'
})
export class UserOrderListComponent implements OnInit {

    @ViewChild('printDiv')
    private printDiv: HTMLDivElement;

    private user$: Observable<User>;
    private invoices$: Observable<Invoice[]>;

    private invoiceToPrint: Invoice | null = null;

    constructor(private authService: UserAuthService,
                private invoiceService: InvoiceEndpointService) {

        this.user$ = this.authService.user$;

        this.invoices$ = this.user$.pipe(
            switchMap((user) => this.invoiceService.allByUser(user.id))
        );

    }

    print(invoice: Invoice){
        this.invoiceToPrint = invoice;

        setTimeout(() => {
            let printContents, popupWin;
            printContents = document.getElementById('print-section').innerHTML;
            popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
            popupWin.document.open();
            popupWin.document.write(`
      <html>
        <head>
          <title>Müsli Shop</title>
          <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
            );
            popupWin.document.close();
        }, 200);
    }

    ngOnInit() {
    }

}
