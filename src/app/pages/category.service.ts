import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  BASE_URL = environment.api_url + 'Category';
  api ={
    get: this.BASE_URL ,
    getById: this.BASE_URL ,
    post: this.BASE_URL,
    put: this.BASE_URL,
    delete: this.BASE_URL,
  }

  constructor(
    private http : HttpClient
  ) {

  }

  loadCategory() {
    return this.http.get(this.api.get);
  }

  loadCategoryById(id: any) {
    return this.http.get(this.api.getById + '/' + id);

  }
  updateCategory(category: any) {
    return this.http.put(this.api.put+'/'+category.id, category);
  }
  addCategory(category: any) {
    return this.http.post(this.api.post, category);
  }
  deleteCategory(id: any) {
    return this.http.delete(this.api.delete + '/' + id);
  }

}
