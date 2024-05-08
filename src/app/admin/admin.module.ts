import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CategorysComponent } from './categorys/categorys.component';
import { EditCategoryDialogComponent } from './categorys/edit-category-dialog/edit-category-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { OrdersComponent } from './orders/orders.component';
import { EditProductDialogComponent } from './products/edit-product-dialog/edit-product-dialog.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    ProductsComponent,
    CategorysComponent,
    OrdersComponent,
    DashboardComponent,
    SidebarComponent,
    AdminComponent,
    EditProductDialogComponent,
    CategorysComponent,
    EditCategoryDialogComponent  
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
    SharedModule,

    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class AdminModule {}
