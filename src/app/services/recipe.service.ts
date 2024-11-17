import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes = new BehaviorSubject<Recipe[]>([]);

  getRecipes(): Observable<Recipe[]> {
    return this.recipes.asObservable();
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): void {
    const currentRecipes = this.recipes.getValue();
    const newId = currentRecipes.length > 0 
      ? Math.max(...currentRecipes.map(r => r.id)) + 1 
      : 1;
    
    this.recipes.next([
      { ...recipe, id: newId },
      ...currentRecipes
    ]);
  }

  updateRecipe(updatedRecipe: Recipe): void {
    const currentRecipes = this.recipes.getValue();
    const index = currentRecipes.findIndex(r => r.id === updatedRecipe.id);
    if (index !== -1) {
      currentRecipes[index] = updatedRecipe;
      this.recipes.next([...currentRecipes]);
    }
  }

  deleteRecipe(id: number): void {
    const currentRecipes = this.recipes.getValue();
    this.recipes.next(currentRecipes.filter(recipe => recipe.id !== id));
  }

  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.getValue().find(recipe => recipe.id === id);
  }
}