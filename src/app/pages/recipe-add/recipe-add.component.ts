import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-add',
  standalone: true,
  imports: [CommonModule, RecipeFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Add New Recipe</h1>
      <app-recipe-form
        (onSave)="saveRecipe($event)"
        (onCancel)="cancel()">
      </app-recipe-form>
    </div>
  `
})
export class RecipeAddComponent {
  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  saveRecipe(recipe: Omit<Recipe, 'id'>) {
    this.recipeService.addRecipe(recipe);
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}