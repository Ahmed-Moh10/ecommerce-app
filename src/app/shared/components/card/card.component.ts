import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
    @Input({required:true}) product:Product = {} as Product ;

    private readonly toastrService = inject(ToastrService)
    private readonly cartService = inject(CartService)

    addProductItemToCart(id:string):void {

      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{

          this.cartService.countNumber.next(res.numOfCartItems)

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
