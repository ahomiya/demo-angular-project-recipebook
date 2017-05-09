import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { AuthService } from '../../auth/auth.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  // Properties
  recipe: Recipe;
  id: number;

  // Constructor
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  // Lifecycle hooks
  ngOnInit() {
    /**
     * Get a single recipe item from the service
     * by subscribing to the changes of route params
     */
    this.route.params
      .subscribe(
        (params: Params) => {
          // Get ID from route params
          this.id = +params['id'];

          // Fetch a recipe by passing the ID
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  // Add ingredients to shopping-list
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  // Edit selected recipe
  onEditRecipe() {
    // Navigate to recipe-edit component
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  // Delete selected recipe
  onDeleteRecipe() {
    // Delete a recipe by passing the ID
    this.recipeService.deleteRecipe(this.id);

    // Navigate to recipes component
    this.router.navigate(['/recipes']);
  }

}
