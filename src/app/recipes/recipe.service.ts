import { Store } from '@ngrx/store';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe-model';
import { Subject } from 'rxjs';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  constructor(
    private store: Store <fromApp.AppState>
  ) { }

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A test recipe', 'This is simply a test',
  // tslint:disable-next-line: max-line-length
  //     'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Onion', 7),
  //       new Ingredient('Lime', 2)
  //     ]),

  //   new Recipe(
  //     'A test recipe2', 'This is simply a test2',
  // tslint:disable-next-line: max-line-length
  //     'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',
  //     [
  //       new Ingredient('Meat', 22),
  //       new Ingredient('Onion', 27),
  //       new Ingredient('Lime', 22)
  //     ]),
  // ];

  private recipes: Recipe[] = [];

  getRecipes(): Recipe[]{
    return this.recipes.slice();
  }

  addIngridientsToShoppingList(ingredients: Ingredient[]): void{
    // this.slService.addIngridients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  getRecipe(index: number): Recipe{
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe): void{
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe, index: number): void{
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
