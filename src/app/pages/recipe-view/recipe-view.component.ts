import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (recipe) {
      <div class="container mx-auto p-4 max-w-2xl">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h1 class="text-3xl font-bold mb-4">{{recipe.title}}</h1>
          
          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Description</h2>
            <p class="text-gray-700">{{recipe.description}}</p>
          </div>
          
          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Ingredients</h2>
            <ul class="list-disc list-inside">
              @for (ingredient of recipe.ingredients; track $index) {
                <li class="text-gray-700">{{ingredient}}</li>
              }
            </ul>
          </div>
          
          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Cooking Instructions</h2>
            <p class="text-gray-700 whitespace-pre-line">{{recipe.cookingInstructions}}</p>
          </div>
          
          <button (click)="goBack()" 
                  class="bg-gray-500 text-white px-6 py-2 rounded-lg">
            Back to List
          </button>
        </div>
      </div>
    }
  `
})
export class RecipeViewComponent implements OnInit {
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

  goBack() {
    this.router.navigate(['/']);
  }
}