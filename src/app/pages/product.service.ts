import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  BASE_URL = environment.api_url + 'Product';
  api ={
    getAll: this.BASE_URL ,
    getById: this.BASE_URL ,
    getByCategory: this.BASE_URL + '/category',
    searchProduct: this.BASE_URL + '/search',
    post: this.BASE_URL,
    put: this.BASE_URL,
    delete: this.BASE_URL,
  }

  constructor(
    private http : HttpClient, private categoryService: CategoryService
  ) {}
  loadProduct() {
    return this.http.get(this.api.getAll);
  }

  loadProductById(id: any) {
    return this.http.get(this.api.getById + '/' + id);
  }

  loadProductByCategory(id: any) {
    return this.http.get(this.api.getByCategory + '/' + id);
  }

  updateProduct(product: any) {
    return this.http.put(this.api.put+'/'+product.id, product);
  }
  addProduct(product: any) {
    return this.http.post(this.api.post, product);
  }
  
  deleteProduct(id: any) {
    return this.http.delete(this.api.delete + '/' + id);
  }
  
  searchProduct(name: string) {
    const params = { productName: name };
    return this.http.get(this.api.searchProduct, { params: params });
  }

  loadCategories() {
    return this.categoryService.loadCategory();
  }
}
