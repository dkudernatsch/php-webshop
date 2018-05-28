import {Component, Inject, OnInit} from '@angular/core';
import {TokenService} from './core/token.service';
import {Observable} from 'rxjs/internal/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';

    constructor(@Inject private tokenService: TokenService) {
    }

    ngOnInit(): void {
        const obs = this.tokenService.requestToken({username: 'if17b094', password: 'hellokitty'});
        obs.subscribe(
            (response) => console.log(response.valueOf())
        );
    }
}
