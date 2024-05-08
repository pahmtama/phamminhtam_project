import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/pages/category.service';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css'],
})
export class EditCategoryDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  categoryForm: any;

  ngOnInit(): void {
    console.log(this.data.row);
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });

    if (this.data.type === 'EDIT') {
      this.loadDataEdit();
    }
  }

  loadDataEdit() {
    this.categoryService
      .loadCategoryById(this.data.row.id)
      .subscribe((item: any) => {
        console.log(item);
        this.categoryForm.patchValue(item.data);
      });
  }

  save() {
    let category = this.data.type === 'EDIT' ?{
      ...this.data.row,
      ...this.categoryForm.value,
    } : this.categoryForm.value;
    console.log(category);

    if(this.data.type === 'EDIT'){
      this.categoryService.updateCategory(category).subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          this.toastr.success('Sửa thành công');
          this.dialogRef.close(true);
        } else {
          this.toastr.error('Sửa thất bại');
        }
      });
    }else{
      this.categoryService.addCategory(category).subscribe((res: any) => {
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
