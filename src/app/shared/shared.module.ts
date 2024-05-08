import { NgModule } from '@angular/core';
import { HmzTableComponent } from './components/hmz-table/hmz-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { LoginCheckDirective } from './login-check.directive';

@NgModule({
  declarations: [
    HmzTableComponent,
    DialogConfirmComponent,
    LoginCheckDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatPaginatorModule,
  ],
  exports: [
    HmzTableComponent
  ]
})
export class SharedModule {}
