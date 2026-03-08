import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit{

    constructor(
  private cdRef: ChangeDetectorRef 
) {}

    private readonly activatedRoute = inject(ActivatedRoute)
    private readonly productDetailsService = inject(ProductDetailsService)
    private readonly cartService = inject(CartService)
    private readonly toastrService = inject(ToastrService)

    id:string | null = null

    productDetails:Product | null = null

    ngOnInit(): void {
        this.getAllParma()

        this.getProductDetailsData()
    }

    getAllParma():void {
        this.activatedRoute.paramMap.subscribe({
            next:(par)=>{
            this.id = par.get('id')

            this.cdRef.detectChanges();
        }
        })
    }


    getProductDetailsData():void {
        this.productDetailsService.getProductDetails(this.id).subscribe({
            next:(res)=>{
                this.productDetails = res.data
                this.cdRef.detectChanges();
            },
            error:(err)=>{
                console.log(err)
            }
        })
    }


    addProductItemToCart(id:string):void {
      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{
          if(res.status === 'success'){
            this.toastrService.success(res.message , "Trendify")
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

}
