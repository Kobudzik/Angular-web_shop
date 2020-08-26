import { Ingridient } from './../shared/ingridient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  ingridientsChanged = new Subject<Ingridient[]>();

  constructor() { }

  private ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomatoes', 10),
    new Ingridient('Bean', 7),
  ];

  getIngridients(): Ingridient[]{
    return this.ingridients.slice();
  }

  addIngridient(ingridient: Ingridient): void{
    this.ingridients.push(ingridient);
    this.ingridientsChanged.next(this.ingridients.slice());
  }

  addIngridients(ingridients: Ingridient[]): void{
    // for(let ingridient of ingridients){
    //   this.addIngridient(ingridient);
    this.ingridients.push(...ingridients);  // spread operator to add array to array
    this.ingridientsChanged.next(this.ingridients.slice());
    }
}
