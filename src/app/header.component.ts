import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { DataStorageService } from './shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from './store/app.reducer';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})

export class HeaderComponent implements OnInit, OnDestroy{
    collapsed = true;
    private userSub: Subscription;
    isAuthenticated = false;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService,
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
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes()
            .subscribe();
    }
    onLogout(){
        this.authService.logout();
    }
}
