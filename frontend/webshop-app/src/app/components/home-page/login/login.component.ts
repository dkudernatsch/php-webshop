import {Component} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login-comp.html'
})
export class LoginComponent {

  someNum: number = 3;

  getServerStatus(): string {
    return 'somestatus';
  }
}
