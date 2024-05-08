import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css'],
})
export class OrderDialogComponent implements OnInit {
  personInfo = {
    name: '',
    phone: '',
    address: '',
    namePayment: '',
    bankName: '',
    bankNumber: '',
  };

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {}

  save() {
    const order = {
      ...this.data,
      name: this.personInfo.name,
      phone: this.personInfo.phone,
      address: this.personInfo.address,
      namePayment: this.personInfo.namePayment,
      bankName: this.personInfo.bankName,
      bankNumber: this.personInfo.bankNumber
    };
    this.dialogRef.close(order);
  }

  close() {
    this.dialogRef.close();
  }
}
