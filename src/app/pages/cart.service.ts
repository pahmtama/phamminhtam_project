import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productCarts:any[] = [];
  cartChanged: Subject<any[]> = new Subject<any[]>();
  BASE_API = environment.api_url + 'Cart';
  api = {
    get: this.BASE_API,
    getById: this.BASE_API,
    post: this.BASE_API,
    put: this.BASE_API,
    delete: this.BASE_API,
  };
  constructor(private toastr: ToastrService, private http: HttpClient) {
  }
  loadCarts() {
   return this.http.get(this.api.get);
  }

  addToCart(cart: any) {
    console.log(cart);
    this.productCarts.push(cart);
    this.emitCartChanged();

    this.http.post(this.api.post, cart).subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('cart', JSON.stringify(data.data));
        this.toastr.success('Thêm vào giỏ hàng thành công', 'Thông báo');
      }
    });

  }
  removeCartItem(id: number) {
   return this.http.delete(this.api.delete + '/' + id);
  }

  private emitCartChanged() {
    this.cartChanged.next(this.productCarts);
  }

  clearCart() {
    this.productCarts = [];
    this.emitCartChanged();
    location.reload();
    localStorage.removeItem('cart');
  }
}
