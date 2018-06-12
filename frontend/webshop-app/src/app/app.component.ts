import {Component, HostListener, OnDestroy} from '@angular/core';
import {AuthService} from './services/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private authService: AuthService) {
        this.authService.updateAuth({}, false);
    }

    title = 'app';

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHandler(event) {
        // TODO: save shopping cart in local storage
        if (localStorage.getItem('stay-logged-in') === 'false')
            this.authService.updateAuth({}, true);
    }

}
