import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "../models/order";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  BASE_URL = environment.api_url + 'Order';
  api = {
    get: this.BASE_URL,
    getById: this.BASE_URL,
    post: this.BASE_URL,
    put: this.BASE_URL,
    delete: this.BASE_URL,
  };

  constructor(
    private http: HttpClient,
  ) { }

  addOrder(order: Order) {
    return this.http.post(this.api.post, order);
  }

  loadOrders() {
    return this.http.get(this.api.get);
  }
  updateOrder(order: Order) {
    return this.http.put(this.api.put, order);
  }
  remove(id: number) {
    return this.http.delete(`${this.api.delete}/${id}`);
  }

}
