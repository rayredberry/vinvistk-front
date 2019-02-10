import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-jwt';

  public loggedIn = false;
  public loginError = false;
  public loginInvalid = false;

  public logInForm = {
      email:null,
      password:null
  }

  constructor(
      private http: HttpClient,
      private Auth: AuthService,
      private Token: TokenService,
      private router: Router,
  ) {

  }

  ngOnInit() {
      if(this.Token.get()) {
          this.http.post(environment.services.auth+"/me", {}).subscribe(
              data => this.handleMeResponse(data),
              error => this.handleMeError(error)
          );
      }
      else {
          this.Auth.changeAuthStatus(false);
      }

      this.Auth.authStatus.subscribe(value => {
          this.loggedIn = value;
      });
  }

  handleMeResponse(data) {
      if(typeof data['error'] != 'undefined' && (data['error'] == 'TOKEN_EXPIRED' || data['error'] == 'TOKEN_INVALID' || data['error'] == 'TOKEN_BLACKLISTED')) {
          if(this.Token.get()) {
              this.Token.remove();
          }
          this.Auth.changeAuthStatus(false);
          this.router.navigate(['/login'])
      }
      else {
          if(data.id == null) {
              return;
          }
          this.Auth.changeAuthStatus(true);
      }
  }

  handleMeError(data) {
      if(this.Token.get()) {
          this.Token.remove();
      }
      this.Auth.changeAuthStatus(false);
      this.router.navigate(['/login']);
  }

  logout(event: MouseEvent) {
      event.preventDefault();
      this.http.post(environment.services.auth + "/logout", []).subscribe(
          data => this.handleLogoutResponse(data),
          error => console.log(error)
      );
  }

  handleLogoutResponse(data) {
      this.Auth.changeAuthStatus(false);
      this.Token.remove();
      this.router.navigate(['/']);
      window.location.reload();
  }

  onSubmit() {
      if(this.logInForm) {
          this.onLoginSubmit();
      } /*else if(this.resetRequestForm) {
          this.onRequestSubmit();
      } else if(this.resetResponseForm) {
          this.onResponseSubmit();
      }*/
      return;
  }

  onLoginSubmit() {
      this.loginInvalid = false;
      if(this.logInForm.email == '' || this.logInForm.email == '') {
          this.loginError = false;
          this.loginInvalid = true;
          return;
      }
      else {
          this.loginInvalid = false;
          return this.http.post(environment.services.auth + "/login", this.logInForm).subscribe(
              data => this.handleLoginResponse(data),
              error => this.handleLoginError(error)
          );
      }
  }

  handleLoginError(error) {
  }

  handleLoginResponse(data) {
      if(data['success'] != false) {
          if(!this.loginInvalid) {
              this.loginError = false;
          }
          const isValid = this.Token.handle(data.access_token);
          // if(isValid) {
              this.router.navigateByUrl('/dashboard');
              this.Auth.changeAuthStatus(true);
              window.location.reload();
          // }
      }
      else {
          if(!this.loginInvalid) {
              this.loginError = true;
          }
      }
  }

}
