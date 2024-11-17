import { Routes } from '@angular/router';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeAddComponent } from './pages/recipe-add/recipe-add.component';
import { RecipeEditComponent } from './pages/recipe-edit/recipe-edit.component';
import { RecipeViewComponent } from './pages/recipe-view/recipe-view.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipe/add', component: RecipeAddComponent },
  { path: 'recipe/edit/:id', component: RecipeEditComponent },
  { path: 'recipe/view/:id', component: RecipeViewComponent },
  { path: '**', redirectTo: '' }
];