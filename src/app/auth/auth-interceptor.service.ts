import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
@Injectable()

export class AutInterceptorService implements HttpInterceptor{
    constructor(
        private authService: AuthService,
        private store: Store <fromApp.AppState>
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler ){
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            // changes first observable- user to new observable inside exhausMap function
            exhaustMap(user => {
                if (!user){
                    return next.handle(req);
                }

                const modifiedRequest = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });

                return next.handle(modifiedRequest);
            })
        );
    }
}
