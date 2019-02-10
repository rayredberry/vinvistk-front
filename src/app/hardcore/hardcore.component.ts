import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-hardcore',
  templateUrl: './hardcore.component.html',
  styleUrls: ['./hardcore.component.scss']
})
export class HardcoreComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
      private Token: TokenService,
      private router: Router,
      private Auth: AuthService
  ) { }

  ngOnInit() {
      let user = this.route.snapshot.paramMap.get("user");
      this.http.post(environment.services.auth + "/hardcore/" + user, []).subscribe(
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

}
