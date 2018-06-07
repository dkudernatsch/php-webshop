import {Component, OnDestroy, ViewChild} from '@angular/core';
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

    private user: User | null = {
        id: undefined,
        username: '',
        mail: '',
        appellation: '',
        first_name: '',
        last_name: '',
        address: '',
        post_code: '',
        city: '',
        is_admin: false
    };

    constructor(private userAuthService: UserAuthService,
                private userEndpointService: UserEndpointService) {
        this.userAuthService.user$.pipe(
            map((user: any | null) => {
                return user === null ? null : user.user;
            })
        ).subscribe((user: User | null) => {
            this.user = user;
        });
    }

    onSubmitUpdateUser() {
        console.log(this.user);
        // update user in backend with the form data!
        this.userEndpointService.updateUser(this.user).subscribe((code) => {
            console.log(code);
        });
    }


}
