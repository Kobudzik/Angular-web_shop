import * as RecipesAction from './../store/recipe.actions';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit  } from '@angular/core';
import { Recipe } from '../recipe-model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          // tslint:disable-next-line: no-string-literal
          this.id = +params['id'];
          // this.recipe = this.recipeService.getRecipe(this.id);
          this.store.select('recipes').pipe(map(recipesState => {
            return recipesState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
          ).subscribe(recipe => this.recipe = recipe);
        }
      );
  }

  onAddToShoppingList(): void{
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe(): void{
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(): void{
    this.store.dispatch(new RecipesAction.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
