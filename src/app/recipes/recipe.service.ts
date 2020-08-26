import { Ingridient } from './../shared/ingridient.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe-model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private slService: ShoppingListService) { }

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe', 'This is simply a test',
      'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',
      [
        new Ingridient('Meat', 1),
        new Ingridient('Onion', 7),
        new Ingridient('Lime', 2)
      ]),

    new Recipe(
      'A test recipe2', 'This is simply a test2',
      'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',
      [
        new Ingridient('Meat', 22),
        new Ingridient('Onion', 27),
        new Ingridient('Lime', 22)
      ]),
  ];

  getRecipes(): Recipe[]{
    return this.recipes.slice();
  }

  addIngridientsToShoppingList(ingridients: Ingridient[]): void{
    this.slService.addIngridients(ingridients);

  }

  getRecipe(index: number): Recipe{
    return this.recipes[index];
  }

}
