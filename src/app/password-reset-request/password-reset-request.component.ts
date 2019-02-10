import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss']
})
export class PasswordResetRequestComponent implements OnInit {

  public form = {
    email: null
  }

  constructor(
      private http: HttpClient,
      private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
      return this.http.post(environment.services.auth + "/password/email", this.form).subscribe(
          data => this.handleResponse(data),
          error => this.handleResponse(error)
      );
  }

  handleResponse(data) {
      console.log("return");
      this.form.email = null;
      this.router.navigateByUrl('/reset-response');
  }

}
