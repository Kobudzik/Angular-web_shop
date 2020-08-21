import { Ingridient } from './../../shared/ingridient.model';
import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [
  ]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild ('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild ('amountInput', {static: false}) amountInputRef: ElementRef;
  @Output() ingridientAdded = new EventEmitter<Ingridient>();


  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(): void{
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngridient = new Ingridient(ingName, ingAmount);

    this.ingridientAdded.emit(newIngridient);
  }
}
