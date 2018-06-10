import {Component, OnInit} from '@angular/core';
import {UserAuthService} from '../../services/auth/user-auth.service';
import {AuthService} from '../../services/auth/auth.service';
import {CategoryEndpointService} from '../../services/api/category-endpoint-service';
import {HttpModule} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageModalService} from "../../services/message-modal/message-modal.service";
import {MessageModalComponent} from "../message-modal/message-modal.component";

@Component({
    selector: 'app-testlogin',
    templateUrl: './testlogin.component.html',
})
export class TestloginComponent {


    private isUser$;
    private isAdmin$;
    private isAnonymous$;

    private user$;

    private bool = false;

    constructor
        ( private userAuthService: UserAuthService
        , private authService: AuthService
        , private categories: CategoryEndpointService
        , private http: HttpClient,
          private modalService: NgbModal,
          private messageModalService: MessageModalService) {

        this.isAdmin$ = userAuthService.hasScope('admin');
        this.isUser$ = userAuthService.hasScope('user');
        this.isAnonymous$ = userAuthService.hasScope('anonymous');
        this.user$ = userAuthService.user$;
    }


    loginUser() {
        this.authService.updateAuth({username: 'if17b094', password: 'Hellokitty1'});
    }

    loginAdmin() {
        this.authService.updateAuth({username: 'admin', password: 'Admin1'});
    }

    logout() {
        this.authService.updateAuth({});
    }

    toggle() {
        this.bool = ! this.bool;
    }

    makeCategory() {
        // this.http.post('https://api.webshop.at/category/', {slug: 'test', name: 'TheName'}).subscribe();
        this.categories.create({slug: 'test', name: 'TheName'}).subscribe();
        // this.http.get('https://api.webshop.at/category/').subscribe((e) => console.log(e));
        this.categories.all().subscribe((c) => console.log(c));
    }

    onShowMessageModal() {
        this.messageModalService.setTitle('Custom Title');
        this.messageModalService.setMessage('Here i can set any message in any component how i want.');
        const modalRef = this.modalService.open(MessageModalComponent);
    }
}
