import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-password-reset-response',
  templateUrl: './password-reset-response.component.html',
  styleUrls: ['./password-reset-response.component.scss']
})
export class PasswordResetResponseComponent implements OnInit {

  public form = {
    phone: null,
    code: null,
    password: null,
    password_confirmation: null,
  }

  constructor(
      private http: HttpClient,
      private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
      return this.http.post(environment.services.auth + "/password/reset", this.form).subscribe(
          data => this.handleResponse(data),
          error => console.log(error)
      );
  }

  handleResponse(data) {
      if(data['success'] == 'Ok') {
          this.form.phone = null;
          this.form.code = null;
          this.form.password = null;
          this.form.password_confirmation = null;

          this.router.navigateByUrl('/login');
      }

  }

}
