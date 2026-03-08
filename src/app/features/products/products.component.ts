import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule , FormsModule , SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly cdRef = inject(ChangeDetectorRef)
  private readonly productsService = inject(ProductsService)
  

  productList: Product[] = []


  pageSize!: number
  p!: number
  total!: number
  text:string = ""


  ngOnInit(): void {
    this.getAllProductsData()
  }

  getAllProductsData(pageNumber: number = 1): void {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.productList = res.data

        this.pageSize = res.metadata.limit
        this.p = res.metadata.currentPage
        this.total = res.results

        this.cdRef.detectChanges();

        
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
