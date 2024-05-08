import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/pages/order.service';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders = [];
  displayedOrders = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  collapsedRows: boolean[] = [];

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.orderService.loadOrders().subscribe((res: any) => {
      this.orders = res.data;
      this.totalPages = Math.ceil(this.orders.length / this.pageSize);
      this.updateDisplayedOrders();
      this.initializeCollapsedRows();
    });
  }

  updateDisplayedOrders() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedOrders = this.orders.slice(startIndex, endIndex);
  }

  initializeCollapsedRows() {
    this.collapsedRows = new Array(this.displayedOrders.length).fill(true);
  }

  toggleRow(index: number) {
    this.collapsedRows[index] = !this.collapsedRows[index];
  }

  isRowCollapsed(index: number) {
    return this.collapsedRows[index];
  }

  deleteOrder(order: any) {
    console.log(order);
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: 'Xác nhận xóa',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.remove(order.id).subscribe((res) => {
          this.toastr.success('Xóa thành công');
          this.loadData();
        });
      }
    });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedOrders();
      this.initializeCollapsedRows();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedOrders();
      this.initializeCollapsedRows();
    }
  }
}
