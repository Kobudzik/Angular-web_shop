import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { DataStorageService } from './shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
        private authService: AuthService
    ){}

    ngOnInit(): void {
        this.userSub = this.authService.userBehaviorSubject.subscribe(user => {
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
