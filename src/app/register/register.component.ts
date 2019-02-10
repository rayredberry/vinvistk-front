import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public form = {
        name:null,
        email:null,
        password:null,
        password_confirmation:null
    }

  constructor(private http: HttpClient,
              private Token: TokenService,
              private router: Router,
              private Auth: AuthService) { }

  onSubmit() {
      return this.http.post(environment.services.auth + "/register", this.form).subscribe(
          data => this.handleResponse(data),
          error => console.log(error)
      );
  }

  ngOnInit() {
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

}
