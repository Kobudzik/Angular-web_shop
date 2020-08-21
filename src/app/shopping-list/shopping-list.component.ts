import { Ingridient } from './../shared/ingridient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ]
})
export class ShoppingListComponent implements OnInit {
  ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomatoes', 10),
    new Ingridient('Bean', 7),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onIngridientAdded(ingrigient: Ingridient): void{
    this.ingridients.push(ingrigient);
  }

}
