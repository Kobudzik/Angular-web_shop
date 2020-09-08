import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: []
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild ('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild ('amountInput', {static: false}) amountInputRef: ElementRef;
  // @Output() ingridientAdded = new EventEmitter<ingredient>();


  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  @ViewChild ('f', {static: false}) slForm: NgForm;

  subscribtion: Subscription;
  editMode = false;
  editedItem: Ingredient;

  ngOnInit(): void {
    this. subscribtion = this.store
      .select('shoppingList')
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1){
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
    });
       // this.subscribtion = this.slService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editMode = true;
    //       this.editedItemIndex = index;
    //       this.editedItem = this.slService.geIngridient(index);

    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       });
    //     }
    //   );
  }



  ngOnDestroy(): void{
    this.subscribtion.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm): void{
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode){
      // this.slService.updateIngridient(this.editedItemIndex, newIngridient);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
        );
    }else{
    // this.slService.addIngridient(newIngridient);
    this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
    // this.ingridientAdded.emit(newIngridient);
  }

  onClear(): void{
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(): void{
    // this.slService.deleteIngridint(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
