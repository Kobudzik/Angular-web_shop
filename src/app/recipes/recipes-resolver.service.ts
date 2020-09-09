import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Recipe } from './recipe-model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as fromApp from '../store/app.reducer';
import * as RecipesAction from '../recipes/store/recipe.actions';
import {Actions, ofType} from '@ngrx/effects';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
                return recipesState.recipes;
            }),
        switchMap(recipes => {
            if  (recipes.length === 0){
                this.store.dispatch(new RecipesAction.FetchRecipes());
                return this.actions$.pipe(
                    ofType(RecipesAction.SET_RECIPES),
                    take(1));
            }else{
                return of(recipes);
            }
        })
        );
        this.store.dispatch( new RecipesAction.FetchRecipes());

    }
}
