import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaymentMethod} from '../../../../types/api/user';


@Component({
    selector: 'app-payment-method',
    templateUrl: './payment-method-comp.html',
})
export class PaymentMethodComponent {

    @Input() pMethod: PaymentMethod;
    @Output() myDelete: EventEmitter<number> = new EventEmitter();

    onDelete() {
        this.myDelete.emit(this.pMethod.id);
        console.log('delete payment method');
    }
}
