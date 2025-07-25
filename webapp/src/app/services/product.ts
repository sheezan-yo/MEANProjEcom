import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { productType } from '../dataTypes';

@Injectable({
  providedIn: 'root'
})
export class Product {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<productType[]>(this.url + '/product');
  }

  getProductById(id: string) {
    return this.http.get<productType>(this.url + '/product/' + id);
  }

  addProduct(product: productType) {
    return this.http.post(this.url + '/product', {
      ...product,
    });
  }

  updateProduct(id: string, product: productType) {
    return this.http.put(this.url + '/product/' + id, {
      ...product,
    });
  }

  deleteProductById(id: string) {
    return this.http.delete(this.url + '/product/' + id);
  }
}
