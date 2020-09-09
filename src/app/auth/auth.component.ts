import { Store } from '@ngrx/store';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert.component';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{

    private closeSub: Subscription;
    private storeSub: Subscription;
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;


    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>
    ){}

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error){
                this.showErrorAlert(this.error);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.closeSub){
            this.closeSub.unsubscribe();
        }
        if (this.storeSub){
            this.storeSub.unsubscribe();
        }
    }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        if (!form.valid){
            return;
        }

        console.log(form.value);
        const email = form.value.email;
        const password = form.value.password;


        if (this.isLoginMode){
            // authObs = this.authService.login(email, password);
            this.store.dispatch(
                new AuthActions.LoginStart({
                    email,
                    password
                })
            );
        }else{
            this.store.dispatch(
                new AuthActions.SignupStart({
                    email,
                    password
                })
            );
        }

        form.reset();
        }

        onHandleError(){
            this.store.dispatch(new AuthActions.ClearError());
    }

    private showErrorAlert(message: string){
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}
