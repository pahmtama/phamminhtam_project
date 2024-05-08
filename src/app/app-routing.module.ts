import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent,
  },
  {
    path:'product/:id',
    component:ProductDetailComponent,
  },
  {
    path:'cart',
    component:CartComponent,
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'register',
    component: RegisterComponent,
  },
  {
    path:'admin',
    canActivate: [AuthGuard],
    component:AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
