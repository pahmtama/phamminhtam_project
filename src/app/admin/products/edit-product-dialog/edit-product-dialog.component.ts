import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/pages/product.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css'],
})
export class EditProductDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}
  
  productForm: any;
  categories: any[] = [];

  ngOnInit(): void {
    console.log(this.data.row);
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^[0-9]*$/),
        Validators.maxLength(10),
      ]),
      description: new FormControl('', [Validators.maxLength(100)]),
      image: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });

    if (this.data.type === 'EDIT') {
      this.loadDataEdit();
    }
    this.loadCategories();
  }

  loadDataEdit() {
    this.productService
      .loadProductById(this.data.row.id)
      .subscribe((item: any) => {
        console.log(item);
        this.productForm.patchValue(item.data);
      });
  }

  loadCategories() {
  this.productService.loadCategories().subscribe((data: any) => {
    this.categories = data.data;
    });
  }

  save() {
  let product = this.data.type === 'EDIT' ? {
    ...this.data.row,
    ...this.productForm.value,
    categoryid: this.productForm.value.category
  } : {
    ...this.productForm.value,
    categoryid: this.productForm.value.category
  };
  console.log(product);

  if (this.data.type === 'EDIT') {
    this.productService.updateProduct(product).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.toastr.success('Sửa thành công');
        this.dialogRef.close(true);
      } else {
        this.toastr.error('Sửa thất bại');
      }
    });
  } else {
    this.productService.addProduct(product).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.toastr.success('Thêm thành công');
        this.dialogRef.close(true);
      } else {
        this.toastr.error('Thêm thất bại');
      }
    });
  }
}

  close() {
    this.dialogRef.close();
  }
}
