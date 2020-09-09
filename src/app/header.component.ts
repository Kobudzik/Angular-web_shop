import * as AuthActions from './auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from './store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipeActions from './recipes/store/recipe.actions';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})

export class HeaderComponent implements OnInit, OnDestroy{
    collapsed = true;
    private userSub: Subscription;
    isAuthenticated = false;

    constructor(
        private store: Store<fromApp.AppState>
    ){}

    ngOnInit(): void {
        this.userSub = this.store
            .select('auth')
            .pipe(map(authState => authState.user))
            .subscribe(user => {
                this.isAuthenticated = !!user; // !user ? false : true;
        });
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

    onSaveData(){
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData(){
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }
    onLogout(){
        this.store.dispatch(new AuthActions.Logout());
    }
}
