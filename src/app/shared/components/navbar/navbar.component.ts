import { ChangeDetectorRef, Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
   constructor(private flowbiteService: FlowbiteService) {}

   private readonly authService = inject(AuthService)
   private readonly cartService = inject(CartService)
  private readonly cdRef = inject(ChangeDetectorRef)
  private readonly id = inject(PLATFORM_ID)
  private readonly router = inject(Router);


   isMenuOpen:boolean = false;
   count!:number

  @Input({required:true}) isLogin!:boolean

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isMenuOpen = false;
      
      window.scrollTo(0, 0);
    });

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getCartNumber()
     if (isPlatformBrowser(this.id)) {
      if (this.isLogin) {
        this.getAllDataCart();
      }
    }
  }


  getCartNumber():void{
    this.cartService.countNumber.subscribe({
      next:(value)=>{
        this.count = value
        this.cdRef.detectChanges();
      }
    })
  }

  getAllDataCart():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.countNumber.next(res.numOfCartItems)
        this.cdRef.detectChanges();
      }
    })
  }

  signOut():void{
    this.authService.logOut()
  }
}
