import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // Properties
  @ViewChild('form') shoppingListForm: NgForm;
  private subscription: Subscription;
  editedItemIndex: number;
  editMode = false;
  editedItem: Ingredient;

  // Constructor
  constructor(private shoppingListService: ShoppingListService) { }

  /**
   * Lifecycle hook that is called after
   * data-bound properties of a directive are initialized
   */
  ngOnInit() {
    /**
     * Edit mode
     * Get array index from the service by
     * subscribing to the changes of an event
     */
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          // Update variables
          this.editedItemIndex = index;
          this.editMode = true;

          // Get a single item (ingredient)
          this.editedItem = this.shoppingListService.getIngredient(index);

          // Populate a form with selected item
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  // Submit form (ingredient)
  onSubmit(form: NgForm) {
    // Variables
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    // Pass form values to the service
    if (this.editMode) {
      // Edit mode : update the existing item with the selected one
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);

      // Exit edit mode
      this.editMode = false;
    } else {
      // Add mode : add new item
      this.shoppingListService.addIngredient(newIngredient);
    }

    // Reset form
    form.reset();
  }

  // Clear form
  onClear() {
    // Reset form
    this.shoppingListForm.reset();

    // Exit edit mode
    this.editMode = false;
  }

  // Delete item
  onDelete() {
    // Reset the form before deleting
    this.onClear();

    // Delete an item by passing the index
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
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
