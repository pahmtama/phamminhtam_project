import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenService } from '../authen.service';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: any = {};
  size = [20, 21, 22, 23, 24, 25, 26];
  cart = {
    size: 0,
    quantity: 0,
    totolPrice: 0,
    product: {},
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService,
    private cartService: CartService,
    private toastr: ToastrService,
    private authenService: AuthenService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.loadProductById(params.id);
      }
    });
  }
  loadProductById(id: any) {
    this.service.loadProductById(id).subscribe((data: any) => {
      this.product = data.data;
    });
  }

  addToCart() {
    if (this.authenService.isAuthenticated()) {
      this.cart = {
        ...this.cart,
        product: this.product,
        totolPrice: this.product.price * this.cart.quantity,
      };
      this.cartService.addToCart(this.cart);
    } else {
      this.toastr.warning('Vui lòng đăng nhập để mua sản phẩm');
      this.router.navigate(['/login']);
    }
  }

  addQuantity(isAdd: boolean) {
    console.log(isAdd);
    if (isAdd) {
      this.cart = {
        ...this.cart,
        quantity: this.cart.quantity + 1,
      }
      this.cart = {
        ...this.cart,
        totolPrice: this.cart.quantity * this.product.price,
      }
    } else {
      if (this.cart.quantity > 1) {
        this.cart = {
          ...this.cart,
          quantity: this.cart.quantity - 1,
        }
        this.cart = {
          ...this.cart,
          totolPrice: this.cart.quantity * this.product.price,
        }
      }
    }
  }
}
