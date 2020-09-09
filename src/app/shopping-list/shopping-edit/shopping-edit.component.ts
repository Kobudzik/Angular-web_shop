import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: []
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild ('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild ('amountInput', {static: false}) amountInputRef: ElementRef;
  // @Output() ingridientAdded = new EventEmitter<ingredient>();


  constructor(private slService: ShoppingListService) { }

  @ViewChild ('f', {static: false}) slForm: NgForm;

  subscribtion: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.subscribtion = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.slService.geIngridient(index);

          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  ngOnDestroy(): void{
    this.subscribtion.unsubscribe();
  }

  onSubmit(form: NgForm): void{
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngridient = new Ingredient(value.name, value.amount);

    if (this.editMode){
      this.slService.updateIngridient(this.editedItemIndex, newIngridient);
    }else{
    this.slService.addIngridient(newIngridient);
    }
    this.editMode = false;
    form.reset();
    // this.ingridientAdded.emit(newIngridient);
  }

  onClear(): void{
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(): void{
    this.slService.deleteIngridint(this.editedItemIndex);
    this.onClear();
  }
}
