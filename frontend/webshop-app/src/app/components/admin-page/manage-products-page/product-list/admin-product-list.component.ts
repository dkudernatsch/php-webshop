import {Component, OnInit} from '@angular/core';
import {ProductEndpointService} from '../../../../services/api/product-endpoint.service';
import {Observable} from 'rxjs/internal/Observable';
import {Product} from '../../../../types/api/product';
import {NgbModal, NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {AdminEditProductModalComponent} from '../edit-product/admin-edit-product.component';

@Component({
    selector: 'app-admin-product-list',
    templateUrl: './admin-product-list.component.html'
})
export class AdminProductListComponent {

    private products$: Observable<Product[]>;

    constructor(private productService: ProductEndpointService, private modalService: NgbModal) {
        this.products$ = productService.all();
    }

    openProductEditModal(product: Product) {
        const modalRef = this.modalService
            .open(AdminEditProductModalComponent);

        modalRef.result.then((reason) => {
                switch (reason) {
                    case 'success': this.products$ = this.productService.all();
                        break;
                    default: return;
            }});

        modalRef.componentInstance.productId = product.id;
        modalRef.componentInstance.formModel = {
            name: product.name,
            rating: product.rating,
            price: product.price,
            categories: product.categories,
            imageData: ''
        };

    }
}
