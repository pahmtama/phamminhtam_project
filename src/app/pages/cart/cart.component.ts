import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: any[] = [];
  constructor(private cartService: CartService,
    private orderService: OrderService,
    private toastr : ToastrService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCart();
  }
  loadCart() {
   this.cartService.loadCarts().subscribe((data: any) => {
      this.carts = data.data;
      console.log(this.carts);

    });
  }
  removeCartItem(cart: Cart) {
    this.cartService.removeCartItem(cart.id ?? 0).subscribe((data: any) => {
      if (data.success) {
        this.toastr.success('Xóa thành công', 'Thông báo');
        this.loadCart();
      }
    });
  }

  subTatal() {
    let total = 0;
    this.carts.forEach((item: any) => {
      total += item.totalPrice;
    });
    return total;
  }
  openDialog() {
  const dialogRef = this.dialog.open(OrderDialogComponent, {
    width: '500px',
    disableClose: true,
    data: {
      carts: this.carts,
      subTotal: this.subTatal(),
    },
  });
  dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
          this.orderService.addOrder(result).subscribe(
              (data: any) => {
                  if (data.success) {
                      for (const item of this.carts) {
                          this.cartService.removeCartItem(item.id ?? 0).subscribe();
                      }
                      this.toastr.success('Đặt hàng thành công', 'Thông báo');
                      this.cartService.clearCart();
                      this.loadCart();
                  } else {
                      this.toastr.error("Sai thông tin thẻ hoặc không đủ số dư", 'Lỗi');
                  }
              },
              (error) => {
                console.log(error);
                this.toastr.error("Sai thông tin thẻ hoặc không đủ số dư", 'Lỗi');
              }
          );
      }
  });

}

}
