import { Cart } from './models/cart.interface';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cdRef = inject(ChangeDetectorRef)
  private readonly cartService = inject(CartService)

  cartDetails:Cart | null = null

  ngOnInit(): void {
      this.getLoggedUserData()
  }

  getLoggedUserData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartDetails = res.data
        this.cdRef.detectChanges();
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  removeItem(id:string):void{
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        this.cartService.countNumber.next(res.numOfCartItems)
        this.cartDetails = res.data
        this.cdRef.detectChanges();
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  updateItem(id:string , count:number):void{
      this.cartService.updateCartCount(id , count).subscribe({
        next:(res)=>{
          this.cartDetails = res.data
          this.cdRef.detectChanges();
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }
}
