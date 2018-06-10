import {Component} from '@angular/core';
import {User} from '../../../../types/api/user';
import {UserAuthService} from '../../../../services/auth/user-auth.service';
import {UserEndpointService} from '../../../../services/api/user-endpoint-service';
import {map} from 'rxjs/operators';


@Component({
    selector: 'app-update-form',
    templateUrl: './update-form-comp.html',
    styleUrls: ['../../user-page.css']
})
export class UpdateFormComponent {

     private user:  User = {
        id: -1,
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
