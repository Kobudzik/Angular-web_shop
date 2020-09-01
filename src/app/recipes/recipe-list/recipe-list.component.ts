import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe-model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.subscription= this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  // onRecipeSelected(recipe: Recipe): void{
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe(): void{
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
