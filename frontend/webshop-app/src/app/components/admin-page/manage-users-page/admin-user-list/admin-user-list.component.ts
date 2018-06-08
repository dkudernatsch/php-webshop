import {Component, OnInit} from '@angular/core';
import {UserEndpointService} from '../../../../services/api/user-endpoint-service';
import {User} from '../../../../types/api/user';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-admin-user-list',
    templateUrl: './admin-user-list.component.html',
})
export class AdminUserListComponent implements OnInit {

    users$: Observable<User[]>;

    constructor(
            private router: Router,
            private route: ActivatedRoute,
            private userService: UserEndpointService) {

        this.users$ = this.userService.all();
    }

    ngOnInit() {
    }

    activate(id: number) {
        this.userService.activateUser(id).subscribe(
            () => this.users$ = this.userService.all()
        );
    }

    deactivate(id: number) {
        this.userService.deactivateUser(id).subscribe(
            () => this.users$ = this.userService.all()
        );
    }

}
