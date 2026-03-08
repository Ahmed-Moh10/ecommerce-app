import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { log } from 'console';


@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule ],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {

  constructor(
  private cdRef: ChangeDetectorRef 
) {}

    categoriesList:Categories[] = []

    categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      550: {
        items: 2
      },
      750: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

    private readonly categoriesService = inject(CategoriesService)

    ngOnInit(): void {
        this.getAllCategoriesData()
    }

    getAllCategoriesData():void {
      this.categoriesService.getAllCategories().subscribe({
        next:(res) => {
          this.categoriesList = res.data
          this.cdRef.detectChanges();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
}
