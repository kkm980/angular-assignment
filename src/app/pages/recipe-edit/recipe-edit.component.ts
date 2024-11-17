import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [CommonModule, RecipeFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Edit Recipe</h1>
      @if (recipe) {
        <app-recipe-form
          [recipe]="recipe"
          (onSave)="updateRecipe($event)"
          (onCancel)="cancel()">
        </app-recipe-form>
      }
    </div>
  `
})
export class RecipeEditComponent implements OnInit {
  recipe?: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipe = this.recipeService.getRecipeById(id);
    if (!this.recipe) {
      this.router.navigate(['/']);
    }
  }

  updateRecipe(updatedRecipe: Omit<Recipe, 'id'>) {
    if (this.recipe) {
      this.recipeService.updateRecipe({ ...updatedRecipe, id: this.recipe.id });
      this.router.navigate(['/']);
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}