import { ShoppingListService } from './shopping-list.service';
import { Ingridient } from './../shared/ingridient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ]
})
export class ShoppingListComponent implements OnInit {
  ingridients: Ingridient[];

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingridients = this.slService.getIngridients();
    this.slService.ingridientsChanged
      .subscribe(
        (ingridients: Ingridient[]) => {
          this.ingridients = ingridients;
        }
      );
  }

  // onIngridientAdded(ingrigient: Ingridient): void{
  //   this.ingridients.push(ingrigient);
  // }

}
