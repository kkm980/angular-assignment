import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableComponent } from '../../components/table/table.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Krishna's Recipe Book</h1>
        <button (click)="navigateToAdd()" 
                class="bg-green-500 text-white px-4 py-2 rounded-lg">
          Add Recipe
        </button>
      </div>

      <app-table 
        [data]="recipesData"
        (onView)="navigateToView($event)"
        (onEdit)="navigateToEdit($event)"
        (onDelete)="deleteRecipe($event)">
      </app-table>
    </div>
  `
})
export class RecipeListComponent {
  recipesData: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipesData = data;
    });
  }

  navigateToAdd() {
    this.router.navigate(['/recipe/add']);
  }

  navigateToEdit(recipe: Recipe) {
    this.router.navigate(['/recipe/edit', recipe.id]);
  }

  navigateToView(recipe: Recipe) {
    this.router.navigate(['/recipe/view', recipe.id]);
  }

  deleteRecipe(recipe: Recipe) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(recipe.id);
    }
  }
}
