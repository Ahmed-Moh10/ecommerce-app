import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from './interfaces/categories.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
    private readonly categoriesService = inject(CategoriesService)

    categoriesList = signal<Categories[]>([])


    ngOnInit(): void {
      this.categoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.categoriesList.set(res.data)
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }



}
