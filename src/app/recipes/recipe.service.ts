import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  // Properties
  recipesChanged = new Subject<Recipe[]>();

  // A mock data source
  private recipes: Recipe[] = [
    new Recipe(
      'Chicken With Chickpeas, Tomatoes, and Chorizo',
      '30-Minute Pressure Cooker Chicken With Chickpeas, Tomatoes, and Chorizo',
      'http://demos.rxseven.com/assets/angular/recipes/recipe-chicken.jpg',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Onion', 1),
        new Ingredient('Smoked Spanish Paprika', 1),
        new Ingredient('Kosher salt', 1),
        new Ingredient('Freshly Ground Black Pepper', 2)
      ]
    ),
    new Recipe(
      'Massaman',
      'Chicken Massaman Curry With Wheat Beer and Potatoes',
      'http://demos.rxseven.com/assets/angular/recipes/recipe-massaman.jpg',
      [
        new Ingredient('Unsweetened Coconut Milk', 1),
        new Ingredient('Belgian-style Wheat Beer', 1),
        new Ingredient('Palm or Light Brown Sugar', 2)
      ]
    )
  ];

  // Constructor
  constructor(private shoppingListService: ShoppingListService) { }

  // Set recipes
  setRecipes(recipes: Recipe[]) {
    // Update (replace) mock data with the live resource
    this.recipes = recipes;

    // Emit changes
    this.emitChanges();
  }

  // Get recipes
  getRecipes() {
    return this.recipes.slice();
  }

  // Get a single recipe item from array
  getRecipe(index: number) {
    return this.recipes[index];
  }

  // Add ingredients of recipe to shopping-list
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  // Add recipe
  addRecipe(recipe: Recipe) {
    // Push a new element to an array
    this.recipes.push(recipe);

    // Emit changes
    this.emitChanges();
  }

  // Update recipe
  updateRecipe(index: number, recipe: Recipe) {
    // Update an array element with new values
    this.recipes[index] = recipe;

    // Emit changes
    this.emitChanges();
  }

  // Delete recipe
  deleteRecipe(index: number) {
    // Remove an array element
    this.recipes.splice(index, 1);

    // Emit changes
    this.emitChanges();
  }

  // Emit changes with a copy of an array
  emitChanges() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
