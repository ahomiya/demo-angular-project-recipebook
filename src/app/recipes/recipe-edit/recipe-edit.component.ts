import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  // Properties
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  // Constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  /**
   * Lifecycle hook that is called after
   * data-bound properties of a directive are initialized
   */
  ngOnInit() {
    /**
     * Get recipe item's ID by subscribing to
     * the changes of route params
     */
    this.route.params
      .subscribe(
        (params: Params) => {
          // Get ID from route params
          this.id = +params['id'];

          // Verify editing mode
          this.editMode = params['id'] != null;

          // Initialize (call) a form
          this.initForm();
        }
      );
  }

  // Initialize (setup) an reactive form
  private initForm() {
    // Declare initial form variables
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    // Edit mode validation
    if (this.editMode) {
      // Fetch data from the service by passing the selected ID
      const recipe = this.recipeService.getRecipe(this.id);

      // Update form variables with returned values
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // If ingredients exist
      if (recipe['ingredients']) {
        // Loop through ingredients array, create form-group with form-controls
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }

    // Create form and form-controls
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  // Add ingredient
  onAddIngredient() {
    // Create form-group with form-controls, push them to the exist form-array
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  // Delete ingredient
  onDeleteIngredient(index: number) {
    // Remove form-group from the form-array by passing array index
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // Submit form
  onSubmit() {
    // Create new item from Recipe model
    const recipeFormValue = this.recipeForm.value;

    // Pass form values to the service
    if (this.editMode) {
      // Edit mode : update the existing item with the selected one
      this.recipeService.updateRecipe(this.id, recipeFormValue);
    } else {
      // Add mode : add new item
      this.recipeService.addRecipe(recipeFormValue);
    }

    // Reset form after submitting
    this.onCancel();
  }

  // Cancel editing form
  onCancel() {
    // Navigate to recipes component
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
