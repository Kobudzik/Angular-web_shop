import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe-model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  constructor(private slService: ShoppingListService) { }
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe', 'This is simply a test',
      'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Onion', 7),
        new Ingredient('Lime', 2)
      ]),

    new Recipe(
      'A test recipe2', 'This is simply a test2',
      'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',
      [
        new Ingredient('Meat', 22),
        new Ingredient('Onion', 27),
        new Ingredient('Lime', 22)
      ]),
  ];

  getRecipes(): Recipe[]{
    return this.recipes.slice();
  }

  addIngridientsToShoppingList(ingredients: Ingredient[]): void{
    this.slService.addIngridients(ingredients);

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

}
