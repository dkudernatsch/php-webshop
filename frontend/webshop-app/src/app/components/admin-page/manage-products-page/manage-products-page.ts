import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateProductModalComponent} from './create-product/create-product-modal';

@Component({
    selector: 'app-manage-products-page',
    templateUrl: './manage-products-page-comp.html'
})
export class ManageProductsPageComponent {

    constructor(private ngModalService: NgbModal) {}

    openCreateNew() {
        const modalRef  = this.ngModalService.open(CreateProductModalComponent);
    }
}
