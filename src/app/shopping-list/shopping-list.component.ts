import { ShoppingListService } from './shopping-list.service';
import { Ingridient } from './../shared/ingridient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: Ingridient[];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }


  ngOnInit(): void {
    this.ingridients = this.slService.getIngridients();
    this.subscription = this.slService.ingridientsChanged
      .subscribe(
        (ingridients: Ingridient[]) => {
          this.ingridients = ingridients;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onIngridientAdded(ingrigient: Ingridient): void{
  //   this.ingridients.push(ingrigient);
  // }

}
