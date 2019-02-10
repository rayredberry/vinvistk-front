import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService as SocialAuthService,    FacebookLoginProvider,    GoogleLoginProvider} from 'angular5-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public form = {
        email:null,
        password:null
    }

  constructor(private http: HttpClient,
              private Token: TokenService,
              private router: Router,
              private Auth: AuthService,
              private socialAuthService: SocialAuthService
          ) { }

  ngOnInit() {
  }

  onSubmit() {
      return this.http.post(environment.services.auth + "/login", this.form).subscribe(
          data => this.handleResponse(data),
          error => console.log(error)
      );
  }

  handleResponse(data) {
      if(data['success'] != false) {
          const isValid = this.Token.handle(data.access_token);
          if(isValid) {
              this.router.navigateByUrl('/');
              this.Auth.changeAuthStatus(true);
          }
      }
  }

  public facebookLogin() {
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
              //this will return user data from facebook. What you need is a user token which you will send it to the server
              this.sendToRestApiMethod(userData.token);
        }
    );
  }

  sendToRestApiMethod(token: string) : void {

    this.http.post(environment.services.auth + "/facebook/login", { token: token } ).subscribe(
            onSuccess => this.handleResponse(onSuccess),
            onFail => console.log(onFail)
        );
  }


  public signinWithGoogle () {
      let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => { //on success
           //this will return user data from google. What you need is a user token which you will send it to the server
           this.sendToRestApiMethod2(userData.idToken);
        }
      );
    }

    sendToRestApiMethod2(token: string) : void {
       this.http.post(environment.services.auth + "/google/login", { token: token } ).subscribe(
           onSuccess => this.handleResponse(onSuccess),
           onFail => console.log(onFail)
      );
    }

}
