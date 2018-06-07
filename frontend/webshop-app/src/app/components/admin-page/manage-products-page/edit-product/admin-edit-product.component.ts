import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NewProduct, Product} from '../../../../types/api/product';
import {ProductEndpointService} from '../../../../services/api/product-endpoint.service';
import {CategoryEndpointService} from '../../../../services/api/category-endpoint-service';

@Component({
    selector: 'app-admin-edit-product',
    templateUrl: './admin-edit-product.component.html'
})
export class AdminEditProductModalComponent {

    constructor(public activeModal: NgbActiveModal,
                private productService: ProductEndpointService,
                private categoryService: CategoryEndpointService) {
        this.categories$ = this.categoryService.all();
    }

    private categories$;

    public productId: number;
    public formModel: NewProduct;
    private rdr: FileReader = new FileReader();

    @ViewChild('errorDiv')
    private errorDiv: HTMLDivElement;

    encodeImage(input: HTMLInputElement) {
        const image = input.files[0];
        this.rdr.onload = (readerEvt: any) => {
            this.formModel.imageData = this.rdr.result;
        };
        this.rdr.readAsDataURL(image);
    }

    submit() {
        this.productService.update(this.productId, this.formModel)
            .subscribe(() => {
                console.log(this.activeModal);
                this.activeModal.close('success');
            });
    }
}
