import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AfterLoginService implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.Token.loggedIn();
    }

    constructor( private Token: TokenService ) { }

}
