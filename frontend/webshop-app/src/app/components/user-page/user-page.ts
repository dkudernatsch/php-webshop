import {Component, ViewChild} from '@angular/core';
import {UserAuthService} from '../../services/auth/user-auth.service';
import {Observable} from 'rxjs/internal/Observable';
import {User} from '../../types/api/user';
import {NgForm} from '@angular/forms';
import {map} from 'rxjs/operators';
import {UserEndpointService} from '../../services/api/user-endpoint-service';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page-comp.html',
    styleUrls: ['user-page.css']
})
export class UserPageComponent {

    @ViewChild('updateUserForm') updateForm: NgForm;
    private user$: Observable<User>;
    private userId: number;

    constructor(private userAuthService: UserAuthService,
                private userEndpointService: UserEndpointService) {
        this.user$ = this.userAuthService.user$.pipe(
            map((user) => {
                return user.user;
            })
        );
        // TODO: think about how to get userId best
        this.user$.subscribe((user: User) => this.userId = user.id);
        // console.log(this.userAuthService.user$.subscribe((user: User) => console.log(user)));
    }

    onSubmitUpdateUser() {
        console.log(this.updateForm.value.username);
        console.log(this.updateForm.value.email);
        console.log(this.updateForm.value.password);
        console.log(this.updateForm.value.appellation);
        console.log(this.updateForm.value.firstname);
        console.log(this.updateForm.value.lastname);
        console.log(this.updateForm.value.street);
        console.log(this.updateForm.value.city);
        console.log(this.updateForm.value.plz);
        console.log(this.userId);

        let user: User = {
            id: this.userId,
            username: this.updateForm.value.username,
            mail: this.updateForm.value.email,
            appellation: this.updateForm.value.appellation,
            first_name: this.updateForm.value.firstname,
            last_name: this.updateForm.value.lastname,
            address: this.updateForm.value.street,
            post_code: this.updateForm.value.plz,
            city: this.updateForm.value.city,
            is_admin: false,
        };

        // update user in backend with the form data!
        this.userEndpointService.updateUser(user).subscribe();
    }


}
