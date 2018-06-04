import {Component, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {UserAuthService} from '../../../services/auth/user-auth.service';
import {AuthService} from '../../../services/auth/auth.service';
import {UserAuth} from '../../../services/auth/userAuth';

@Component({
  selector: 'app-login',
  templateUrl: './login-comp.html',
  styleUrls: ['login-component.css']
})
export class LoginComponent {

  // local references to forms
  @ViewChild('registerForm') registerForm: NgForm;
  @ViewChild('loginForm') loginForm: NgForm;
  private isUser$;
  closeResult: string;

  constructor(private modalService: NgbModal,
              private userAuthService: UserAuthService,
              private authService: AuthService) {
    this.isUser$ = userAuthService.hasScope('user');
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onSubmitLogin() {
    console.log(this.loginForm);
    console.log(this.loginForm.value);
    console.log(this.loginForm.value.username);
    console.log(this.loginForm.value.password);
    this.login({username: this.loginForm.value.username, password: this.loginForm.value.password});
  }

  onSubmitRegister(form: NgForm) {
    console.log(this.registerForm);
    console.log(this.loginForm.value);
  }

  login(userAuth: UserAuth) {
    this.authService.updateAuth(userAuth);
  }

  logout() {
    this.authService.updateAuth({});
  }

}
