import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { cartItemType, productType } from '../dataTypes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private url = environment.apiUrl;
  carts: cartItemType[] = [];
  constructor(private http: HttpClient) { }

  init() {
    return this.getCart().subscribe((result) => {
      this.carts = result;
    });
  }

  getCart() {
    return this.http.get<cartItemType[]>(this.url + "/customer/carts");
  }

  addCart(productId: string, quantity: number) {
    return this.http.post(this.url + "/customer/carts/" + productId, {
      quantity: quantity
    });
  }

  deleteCart(productId: string) {
    return this.http.delete(this.url + "/customer/carts/" + productId);
  }
}
