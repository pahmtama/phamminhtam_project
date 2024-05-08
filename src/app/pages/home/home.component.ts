import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  displayedProducts: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoryId = params['category'];
      const searchKeyword = params['searchKeyword'];
  
      if (categoryId) {
        this.loadProductByCategory(categoryId);
      } else if (searchKeyword) {
        this.searchProduct(searchKeyword);
      } else {
        this.loadProduct();
      }
    });
  }

  loadProduct() {
    this.productService.loadProduct().subscribe((data: any) => {
      this.displayedProducts = data.data;
    });
  }

  loadProductByCategory(categoryId: number) {
    this.productService.loadProductByCategory(categoryId).subscribe((data: any) => {
      this.displayedProducts = data.data;
    });
  }

  searchProduct(keyword: string) {
    this.productService.searchProduct(keyword).subscribe((data: any) => {
      this.displayedProducts = data.data;
    });
  }
}
