import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // Properties
  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  // Constructor
  constructor(private shoppingListService: ShoppingListService) { }

  // Lifecycle hooks
  ngOnInit() {
    // Get ingredients from the service when the component is initialized
    this.ingredients = this.shoppingListService.getIngredients();

    // Get ingredients from the service by subscribing to the changes of an event
    this.subscription = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  // Edit an existing item
  onEditItem(index: number) {
    // Emit array index through the service
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    // Dispose the resource held by the subscription
    this.subscription.unsubscribe();
  }
}
