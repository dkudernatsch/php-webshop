import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewProduct, Category } from '../../../types/api/product';
import { ProductEndpointService } from '../../../services/api/product-endpoint.service';
import { CategoryEndpointService } from '../../../services/api/category-endpoint-service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-create-products-modal',
    templateUrl: './create-product-comp.html'
})
export class CreateProductModalComponent {

    private rdr: FileReader = new FileReader();

    private categories$: Observable<Category[]>;

    private formModel: NewProduct = {
        name: '',
        categories: [],
        price: 0.00,
        rating: 0,
        imageData: ''
    };


    constructor(public activeModal: NgbActiveModal,
        private productService: ProductEndpointService,
        private categoryService: CategoryEndpointService) {

        this.categories$ = this.categoryService.all();
    }

    submit() {

        this.productService.create(this.formModel)
            .subscribe(() => {
                this.activeModal.close('Close click');
            });
    }

    encodeImage(input: HTMLInputElement) {
        const image = input.files[0];
        this.rdr.onload = (readerEvt: any) => {
            this.formModel.imageData = this.rdr.result;
        };
        this.rdr.readAsDataURL(image);
    }
}
