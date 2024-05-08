import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { EditCategoryDialogComponent } from './admin/categorys/edit-category-dialog/edit-category-dialog.component';
import { EditProductDialogComponent } from './admin/products/edit-product-dialog/edit-product-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavabarComponent } from './layouts/navabar/navabar.component';
import { SlideHeroComponent } from './layouts/slide-hero/slide-hero.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderDialogComponent } from './pages/cart/order-dialog/order-dialog.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { DialogConfirmComponent } from './shared/components/dialog-confirm/dialog-confirm.component';
import { ProductListComponent } from './shared/components/product-list/product-list.component';
import { CurrencyPipe } from './shared/currency.pipe';
import { SharedModule } from './shared/shared.module';

const IMPORT = [
  CommonModule,
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatDialogModule,
  SharedModule,
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  ToastrModule.forRoot(), // ToastrModule added

];
@NgModule({
  declarations: [
    AppComponent,
    NavabarComponent,
    SlideHeroComponent,
    FooterComponent,
    HomeComponent,
    CurrencyPipe,
    ProductListComponent,
    ProductDetailComponent,
    BreadcrumbComponent,
    CartComponent,
    OrderDialogComponent,
    LoginComponent,
    RegisterComponent,
  ],
  entryComponents: [
    OrderDialogComponent,
    EditProductDialogComponent,
    EditCategoryDialogComponent,
    DialogConfirmComponent
  ],
  imports: [...IMPORT],
  exports: [
    BreadcrumbComponent,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
