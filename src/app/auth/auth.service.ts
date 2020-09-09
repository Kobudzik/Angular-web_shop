import * as AuthActions from './store/auth.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })

export class AuthService{
    token = null;
    private tokenExpirationTimer: any;

    constructor(
        private store: Store<fromApp.AppState>
    ){}

    // userBehaviorSubject = new BehaviorSubject<User>(null);


    setLogoutTimer(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, expirationDuration);
    }

    clearLogoutTimer(){
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

}
