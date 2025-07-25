import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { productType } from '../dataTypes';

@Injectable({
  providedIn: 'root'
})
export class WishlistCart {
  private url = environment.apiUrl;
  wishlists: productType[] = [];
  constructor(private http: HttpClient) { }



  init() {
    return this.getWishlist().subscribe((result) => {
      this.wishlists = result;
    });
  }

  getWishlist() {
    return this.http.get<productType[]>(this.url + "/customer/wishlists");
  }

  addWishlist(productId: string) {
    return this.http.post(this.url + "/customer/wishlists/" + productId, {});
  }

  deleteWishlist(productId: string) {
    return this.http.delete(this.url + "/customer/wishlists/" + productId);
  }
}
