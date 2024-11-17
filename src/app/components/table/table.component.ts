import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border-b">ID</th>
          <th class="px-4 py-2 border-b">Title</th>
          <th class="px-4 py-2 border-b">Description</th>
          <th class="px-4 py-2 border-b">Ingredients</th>
          <th class="px-4 py-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (recipe of data; track recipe.id) {
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 border-b">{{recipe.id}}</td>
            <td class="px-4 py-2 border-b">{{recipe.title}}</td>
            <td class="px-4 py-2 border-b">{{recipe.description | slice:0:50}}...</td>
            <td class="px-4 py-2 border-b">{{recipe.ingredients.join(', ')}}</td>
            <td class="px-4 py-2 border-b">
              <button class="bg-blue-500 text-white px-2 py-1 rounded mr-2" 
                      (click)="onView.emit(recipe)">View</button>
              <button class="bg-yellow-500 text-white px-2 py-1 rounded mr-2" 
                      (click)="onEdit.emit(recipe)">Edit</button>
              <button class="bg-red-500 text-white px-2 py-1 rounded" 
                      (click)="onDelete.emit(recipe)">Delete</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      overflow-x: auto;
    }
  `]
})
export class TableComponent {
  @Input() data: Recipe[] = [];
  @Output() onView = new EventEmitter<Recipe>();
  @Output() onEdit = new EventEmitter<Recipe>();
  @Output() onDelete = new EventEmitter<Recipe>();
}