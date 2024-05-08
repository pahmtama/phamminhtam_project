import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() products: any[] = [];
  @Input() title = '';

  currentPage = 1;
  pageSize = 4;
  totalPages = 0;
  displayedProducts: any[] = this.products;

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.products = this.products.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }
}
