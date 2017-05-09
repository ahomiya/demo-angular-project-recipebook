import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import "rxjs/Rx";

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  // Properties
  urlApi = 'https://ng-recipebook-5ad27.firebaseio.com';
  urlRecipes = this.urlApi + '/recipes.json';

  // Constructor
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  // Get token
  getToken(): string {
    // Variables
    const authParams = '?auth=';

    // Get user token
    const authToken = this.authService.getToken();

    console.log('data-storage.service.ts | getToken() :' + authToken);

    // Return token
    return (authParams + authToken);
  }

  // Store recipes (save)
  storeRecipes() {
    /**
     * Get recipes-list from the service then send an HTTP request to the API,
     * finally return the observable to the observer.
     */
    return this.http.put(
      this.urlRecipes + this.getToken(),
      this.recipeService.getRecipes()
    );
  }

  // Get recipes (fetch)
  getRecipes() {
    // Get user token
    // const authToken = this.authService.getToken();

    /**
     * Send HTTP request to the API and listen to the response
     * by subscribing to the changes of an event.
     */
    this.http.get(this.urlRecipes + this.getToken())
      // Transform the response
      .map(
        (response: Response) => {
          // Get parsed JSON data
          const recipes: Recipe[] = response.json();

          /**
           * Loop through the recipes and check if each recipe
           * does not have an ingredients property
           */
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              // Add missing property with empty array
              recipe['ingredients'] = [];
            }
          }

          // Return transfomed response to the observer
          return recipes;
        }
      )

      // Listen to the response
      .subscribe(
        (recipes: Recipe[]) => {


          /**
           * Update recipes array by passing the response
           * through the recipe-seervice.
           */
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
