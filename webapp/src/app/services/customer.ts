import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { brandType, categoryType, productType } from '../dataTypes';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Customer {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getNewProduct() {
    return this.http.get<productType[]>(this.url + "/customer/new-products");
  }

  getFeaturedProduct() {
    return this.http.get<productType[]>(this.url + "/customer/featured-products");
  }

  getCategories() {
    return this.http.get<categoryType[]>(this.url + "/customer/categories");
  }

  getProducts(searchTerm: string, categoryId: string, page: number, pageSize: number, sortBy: string, sortOrder: number, brandId: string) {
    return this.http.get<productType[]>(this.url + `/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}&page=${page}&pageSize=${pageSize}`);
  }

  getBrands() {
    return this.http.get<brandType[]>(this.url + "/customer/brands");
  }

  getProductById(id: string) {
    return this.http.get<productType>(this.url + "/customer/product/" + id);
  }

  getCategory(catId: string) {
    return this.http.get(this.url + "/customer/category/" + catId);
  }
}
