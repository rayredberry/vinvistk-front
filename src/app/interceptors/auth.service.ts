import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {tap} from 'rxjs/operators';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private Token: TokenService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.Token.get();
      if(token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });

          return next.handle(req).pipe(tap(evt => {
            if (evt instanceof HttpResponse) {
              // console.log(evt);
            }
        }));
      }
      else {
          return next.handle(req);
        }
  }
}
