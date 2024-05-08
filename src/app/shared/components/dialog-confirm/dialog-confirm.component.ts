import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css'],
})
export class DialogConfirmComponent implements OnInit {
  title!: string;
  message!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  save() {
    this.dialogRef.close(true);
  }
  close() {
    this.dialogRef.close();
  }
}
