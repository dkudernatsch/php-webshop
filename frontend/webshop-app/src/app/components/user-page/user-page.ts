import {Component, ViewChild} from '@angular/core';
import {UserAuthService} from '../../services/auth/user-auth.service';
import {Observable} from 'rxjs/internal/Observable';
import {User} from '../../types/api/user';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page-comp.html',
    styleUrls: ['user-page.css']
})
export class UserPageComponent {

    @ViewChild('updateUserForm') updateForm: NgForm;
    private user$: User;

    constructor(private userAuthService: UserAuthService) {
        // this.user$ = this.userAuthService.user$;
        this.userAuthService.user$.subscribe((user: User) => this.user$ = user);
    }

    onSubmitUpdateUser() {
        console.log(this.updateForm.value.username);
        console.log(this.updateForm.value.password);
        console.log(this.updateForm.value.appellation);
        console.log(this.updateForm.value.firstname);
        console.log(this.updateForm.value.lastname);
        console.log(this.updateForm.value.email);
        console.log(this.updateForm.value.street);
        console.log(this.updateForm.value.city);
        // update user in backend with the form data!
    }

}
