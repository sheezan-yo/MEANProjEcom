import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { orderType } from '../dataTypes';

@Injectable({
  providedIn: 'root'
})
export class Order {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  addOrder(order: orderType) {
    return this.http.post(this.url + "/customer/order", order);
  }

  getCustomerOrders() {
    return this.http.get<orderType[]>(this.url + "/customer/orders");
  }

  cancelOrder(id: string) {
    return this.http.delete(this.url + "/customer/orders/" + id);
  }

  getAdminOrder() {
    return this.http.get<orderType[]>(this.url + "/orders");
  }

  updateOrderStatus(id: string, status: string) {
    return this.http.post(this.url + "/orders/" + id, { status: status });
  }
}
