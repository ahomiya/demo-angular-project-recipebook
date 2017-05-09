import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // Properties
  recipes: Recipe[];
  private subscription: Subscription;

  // Constructor
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  /**
   * Lifecycle hook that is called after
   * data-bound properties of a directive are initialized
   */
  ngOnInit() {
    // Get recipe-list from the service
    this.recipes = this.recipeService.getRecipes();

    /**
     * Get the updated recipe-list from the service
     * by subscribing to the changes of an event
     */
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  // Add new recipe
  onNewRecipe() {
    // Navigate to recipe-edit component
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  /**
   * Lifecycle hook that is called when
   * a directive, pipe or service is destroyed
   */
  ngOnDestroy() {
    // Dispose the resource held by the subscription
    this.subscription.unsubscribe();
  }
}
