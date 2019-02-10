import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(private http: HttpClient,
                private Token: TokenService,
                private router: Router,
                private Auth: AuthService
            ) { }

    ngOnInit() {
        return this.http.post(environment.services.auth+"/logout", {}).subscribe(
            data => this.handleResponse(data),
            error => console.log(error)
        );
    }

    handleResponse(data) {
        if(data['message'] && data['message'] == 'Successfully logged out') {
            this.Token.remove();
            this.Auth.changeAuthStatus(false);
            this.router.navigateByUrl('');
        }
    }

}
