import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenService {

  private tokenKey = "git-token"; // change this to something unique to your project - e.g. "secret_santa_2019_token"

  private iss = {
      login: environment.services.login
  }

  constructor() { }

  handle(token) {
      this.set(token);
      return this.isValid();
  }

  set(token) {
      localStorage.setItem(this.tokenKey, token);
  }

  get() {
      return localStorage.getItem(this.tokenKey);
  }

  remove() {
      return localStorage.removeItem(this.tokenKey);
  }

  isValid() {
      const token = this.get();
      if(token && token != null) {
         const payload = this.payload(token);
         if(payload) {
             return true;
             //return Object.values(this.iss).indexOf(payload.iss) > -1 ? true:false;
         }

         return false;
      }
      else {
          return false;
      }
  }

  payload(token) {
      const payload = token.split('.')[1];
      return this.decode(payload);
  }

  decode(payload) {
      return JSON.parse(atob(payload));
  }

  loggedIn() {
      return this.isValid();
  }

}
