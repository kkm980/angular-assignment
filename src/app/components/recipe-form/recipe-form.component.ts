import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()" class="max-w-2xl mx-auto p-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input type="text" formControlName="title"
               class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        @if (recipeForm.get('title')?.errors?.['required'] && recipeForm.get('title')?.touched) {
          <span class="text-red-500 text-sm">Title is required</span>
        }
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea formControlName="description" rows="3"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"></textarea>
        @if (recipeForm.get('description')?.errors?.['required'] && recipeForm.get('description')?.touched) {
          <span class="text-red-500 text-sm">Description is required</span>
        }
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Cooking Instructions</label>
        <textarea formControlName="cookingInstructions" rows="4"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"></textarea>
        @if (recipeForm.get('cookingInstructions')?.errors?.['required'] && recipeForm.get('cookingInstructions')?.touched) {
          <span class="text-red-500 text-sm">Cooking instructions are required</span>
        }
      </div>

      <div class="mb-4" formArrayName="ingredients">
        <label class="block text-gray-700 text-sm font-bold mb-2">Ingredients</label>
        @for (ingredient of ingredients.controls; track $index) {
          <div class="flex gap-2 mb-2">
            <input [formControlName]="$index" type="text"
                   class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
            <button type="button" (click)="removeIngredient($index)"
                    class="bg-red-500 text-white px-4 py-2 rounded-lg">Remove</button>
          </div>
        }
        <button type="button" (click)="addIngredient()"
                class="bg-green-500 text-white px-4 py-2 rounded-lg">Add Ingredient</button>
      </div>

      <div class="flex gap-4">
        <button type="submit" [disabled]="!recipeForm.valid"
                class="bg-blue-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-400">
          {{recipe ? 'Update' : 'Save'}}
        </button>
        <button type="button" (click)="onCancel.emit()"
                class="bg-gray-500 text-white px-6 py-2 rounded-lg">
          Cancel
        </button>
      </div>
    </form>
  `
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe?: Recipe;
  @Output() onSave = new EventEmitter<Omit<Recipe, 'id'>>();
  @Output() onCancel = new EventEmitter<void>();

  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      cookingInstructions: ['', [Validators.required]],
      ingredients: this.fb.array([])
    });
  }

  ngOnInit() {
    if (this.recipe) {
      this.recipeForm.patchValue({
        title: this.recipe.title,
        description: this.recipe.description,
        cookingInstructions: this.recipe.cookingInstructions
      });
      this.recipe.ingredients.forEach(ingredient => {
        this.ingredients.push(this.fb.control(ingredient));
      });
    } else {
      this.addIngredient();
    }
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.onSave.emit(this.recipeForm.value);
    }
  }
}