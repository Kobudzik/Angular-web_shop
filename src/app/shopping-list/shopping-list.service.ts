import { Ingridient } from './../shared/ingridient.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  ingridientsChanged = new EventEmitter<Ingridient[]>();

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
    this.ingridientsChanged.emit(this.ingridients.slice());
  }

  addIngridients(ingridients: Ingridient[]): void{
    // for(let ingridient of ingridients){
    //   this.addIngridient(ingridient);
    this.ingridients.push(...ingridients);  // splice operator or split
    this.ingridientsChanged.emit(this.ingridients.slice());
    }
}
