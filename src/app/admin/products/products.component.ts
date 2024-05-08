import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/pages/product.service';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = [];
  categories = [];
  displayedProducts = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }



  loadData() {
    this.productService.loadProduct().subscribe((res: any) => {
      this.products = res.data;
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
      this.updateDisplayedProducts();
    });
  }


  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  editProduct(product: any) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        type: 'EDIT',
        row: product,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        type: 'ADD',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  deleteProduct(product: any) {
    console.log(product);
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: 'Xác nhận xóa',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(product.id).subscribe((res) => {
          this.toastr.success('Xóa thành công');
          this.loadData();
        });
      }
    });
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
