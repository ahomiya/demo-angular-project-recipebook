import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {
  // Properties
  ingredients: Ingredient[] = [
    new Ingredient('Extra-vergin oil', 5),
    new Ingredient('Spanish-style chorizo', 8)
  ];

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  // Constructor
  constructor() { }

  // Get a single ingredient item
  getIngredient(index: number) {
    // Return a single array element
    return this.ingredients[index];
  }

  // Get ingredients
  getIngredients() {
    // Return a copy of an array
    return this.ingredients.slice();
  }

  // Add new ingredient
  addIngredient(ingredient: Ingredient) {
    // Push a new element to an array
    this.ingredients.push(ingredient);

    // Emit changes with a copy of an array
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // Add ingredients
  addIngredients(ingredients: Ingredient[]) {
    // Push a list of elements to an array
    this.ingredients.push(...ingredients);

    // Emit changes with a copy of an array
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // Update ingredient
  updateIngredient(index: number, ingredient: Ingredient) {
    // Update an array element with new values
    this.ingredients[index] = ingredient;

    // Emit changes with a copy of an array
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // Delete ingredient
  deleteIngredient(index: number) {
    // Remove an array element
    this.ingredients.splice(index, 1);

    // Emit changes with a copy of an array
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
