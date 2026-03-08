import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient)
  private readonly cookieService = inject(CookieService)

  countNumber:BehaviorSubject<number> = new BehaviorSubject(0)


  addProductToCart(id: string): Observable<any> {
  return this.httpClient.post(environment.baseUrl + "cart", { productId: id }).pipe(
    tap((res: any) => {
      this.countNumber.next(res.numOfCartItems);
    })
  );
}


  getLoggedUserCart():Observable<any> {
    return this.httpClient.get(environment.baseUrl  +  'cart' ,  
      
    )
  }

  removeSpecificCartItem(id: string): Observable<any> {
  return this.httpClient.delete(environment.baseUrl + `cart/${id}`).pipe(
    tap((res: any) => {
      if (res.numOfCartItems !== undefined) {
        this.countNumber.next(res.numOfCartItems);
      } else if (res.status === 'success') {
        this.countNumber.next(res.numOfCartItems);
      }
    })
  );
}

  updateCartCount(id:string , count:number):Observable<any> {
    return this.httpClient.put(environment.baseUrl + `cart/${id}` , 
      {
        count: count ,
      },
      
    )
  }


  checkOutSession(id:string | null  , data:object):Observable<any> {
    return this.httpClient.post(environment.baseUrl  +   `orders/checkout-session/${id}?url=http://localhost:4200`  , data)
  }

}
