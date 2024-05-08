import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/pages/authen.service';
import { CartService } from 'src/app/pages/cart.service';
import { CategoryService } from 'src/app/pages/category.service';
import { ProductService } from 'src/app/pages/product.service';


@Component({
  selector: 'app-navabar',
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.css'],
})
export class NavabarComponent implements OnInit {
  cartItemCount: number = 0;
  isLogin: boolean = false;
  categories: any[] = [];
  searchKeyword: string = '';
  selectedCategory: string = '';
  productSearch: any[] = [];

  constructor(
    private cartService: CartService,
    private authenService: AuthenService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.isLogin);

    this.cartService.loadCarts().subscribe((data: any) => {
      this.cartItemCount = data.data.length;
    });

    this.cartService.cartChanged.subscribe((items: any[]) => {
      this.cartItemCount = items.length;
    });
    this.checkLogin();

    this.loadCategories();
  }

  checkLogin() {
    if (this.authenService.isAuthenticated()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  loadCategories() {
    this.categoryService.loadCategory().subscribe((data: any) => {
      this.categories = data.data;
    });
  }

  selectCategory(categoryId: number) {
    this.router.navigate(['/home'], { queryParams: { category: categoryId } });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogin = false;
    window.location.reload();
  }

  search() {
    this.productService.searchProduct(this.searchKeyword).subscribe((data: any) => {
      this.productSearch = data.data;
      this.router.navigate(['/home'], { queryParams: { searchKeyword: this.searchKeyword } });
    });
  }

}
