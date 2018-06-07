import {Component, Input} from '@angular/core';
import {PaymentMethod} from '../../../types/api/user';


@Component({
    selector: 'app-payment-method',
    templateUrl: './payment-method-comp.html',
})
export class PaymentMethodComponent {

    @Input() pMethod: PaymentMethod;

    onDelete() {
        console.log('delete payment method');
    }
}
