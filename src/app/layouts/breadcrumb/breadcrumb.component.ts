import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumb: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.generateBreadcrumb();
  }

  generateBreadcrumb() {
    this.breadcrumb = this.router.url.split('/');
    this.breadcrumb.shift();
    this.breadcrumb.forEach((item: any, index: any) => {
      if (item == '') {
        this.breadcrumb.splice(index, 1);
      }
    });
    console.log(this.breadcrumb);

    return this.breadcrumb;
  }
}
