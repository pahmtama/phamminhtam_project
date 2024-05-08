import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ButtonConfig, EColumType, HMZTableColumn } from './interface/hmz-table';
import { Observable, Subject } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { fomatNumber } from '../../hmz-helper';

@Component({
  selector: 'app-hmz-table',
  templateUrl: './hmz-table.component.html',
  styleUrls: ['./hmz-table.component.css'],
})
export class HmzTableComponent implements OnInit, AfterViewInit {
  @Input() columns: HMZTableColumn[] = [];
  @Input() data!: Subject<any>;
  @Input() pageSizeOptions: number[] = [5, 10, 50, 100]; // Options cho pageSize


  @ViewChild('tableBody') tableBody!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  items: any[] = [];
  totalItems: any;
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor() {}

  ngOnInit(): void {
    console.log(this.columns);
  }

  ngAfterViewInit(): void {
    this.createTableBody();
  }

  createTableBody() {
    this.data.subscribe((res: any) => {
      this.totalItems = res.total; // Tổng số item
      this.paginator.pageIndex = this.pageIndex;
      this.paginator.pageSize = this.pageSize;

      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      const displayedData = res.data.slice(startIndex, endIndex);
      displayedData.forEach((item: any) => {
        let tr = document.createElement('tr');
        this.columns.forEach((column: HMZTableColumn) => {
          // Kiểm tra thuộc tính trong item có trong columns
          let td = document.createElement('td');
          if (column.key in item) {
            if (column.type === EColumType.text) {
              td.innerHTML = item[column.key];
            }
            // check if column is image
            if (column.type === EColumType.image) {
              let img = document.createElement('img');
              img.src = item[column.key];
              img.width = 50;
              td.appendChild(img);
            }
            if (column.type === EColumType.date) {
              td.innerHTML = new Date(item[column.key]).toLocaleDateString();
            }
            if (column.type === EColumType.number) {
              td.innerHTML = fomatNumber(item[column.key]);
            }
            if (column.type === EColumType.currency) {
              td.innerHTML = fomatNumber(item[column.key]) + 'đ';
            }
          }
          if (column.buttons && column.type === EColumType.action) {
            console.log(column.buttons);
            column.buttons.forEach((button: ButtonConfig) => {
              let btn = document.createElement('button');
              btn.innerText = button.label;
              btn.className = button.class;
              btn.onclick = () => {
                button.event({
                  type: button.key,
                  row: item,
                });
              };
              td.appendChild(btn);
            });
          }
          // add td to tr
          tr.appendChild(td);
        });
        this.tableBody.nativeElement.appendChild(tr);
      });
    });
  }
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.tableBody.nativeElement.innerHTML = '';
    this.createTableBody();
  }
}
