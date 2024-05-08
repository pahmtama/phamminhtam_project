import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/pages/category.service';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { EditCategoryDialogComponent } from './edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css'],
})
export class CategorysComponent implements OnInit {
  categorys = [];
  displayedCategorys = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.categoryService.loadCategory().subscribe((res: any) => {
      this.categorys = res.data;
      this.totalPages = Math.ceil(this.categorys.length / this.pageSize);
      this.updateDisplayedCategorys();
    });
  }

   updateDisplayedCategorys() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedCategorys = this.categorys.slice(startIndex, endIndex);
  }

  editCategory(category: any) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        type: 'EDIT',
        row: category,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  addCategory() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
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

  deleteCategory(category: any) {
    console.log(category);
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: 'Xác nhận xóa',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(category.id).subscribe((res) => {
          this.toastr.success('Xóa thành công');
          this.loadData();
        });
      }
    });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedCategorys();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedCategorys();
    }
  }
}

