import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, UrlSegment} from '@angular/router';
import {UserEndpointService} from '../../../../services/api/user-endpoint-service';
import {Observable} from 'rxjs/internal/Observable';
import {User} from '../../../../types/api/user';
import {flatMap, map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-admin-user-details',
    templateUrl: './admin-user-order-list.component.html'
})
export class AdminUserDetailsComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private userService: UserEndpointService) {
    }

    ngOnInit() {
    }

}
