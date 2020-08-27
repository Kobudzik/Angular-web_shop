import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  ingridientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  constructor() { }

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Bean', 7),
  ];

  geIngridient(index: number): Ingredient{
    return this.ingredients[index];
  }

  getIngridients(): Ingredient[]{
    return this.ingredients.slice();
  }

  addIngridient(ingredient: Ingredient): void{
    this.ingredients.push(ingredient);
    this.ingridientsChanged.next(this.ingredients.slice());
  }

  addIngridients(ingredients: Ingredient[]): void{
    // for(let ingredient of ingredients){
    //   this.addIngridient(ingredient);
    this.ingredients.push(...ingredients);  // spread operator to add array to array
    this.ingridientsChanged.next(this.ingredients.slice());
    }

    updateIngridient(index: number, newIngridient: Ingredient): void{
      this.ingredients[index] = newIngridient;
      this.ingridientsChanged.next(this.ingredients.slice());
    }

    deleteIngridint(index: number): void{
      this.ingredients.splice(index, 1);
      this.ingridientsChanged.next(this.ingredients.slice());
    }
}
