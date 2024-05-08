import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorysComponent } from './categorys/categorys.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  { path: 'categorys', component: CategorysComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },

  { path: '**', redirectTo: '/admin' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
