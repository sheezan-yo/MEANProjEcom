import { Component, Input } from '@angular/core';
import { productType } from '../../dataTypes';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WishlistCart } from '../../services/wishlist-cart';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() item!: productType;
  constructor(private wishlist: WishlistCart, private cart: Cart) { }

  addToWishlist(product: productType) {
    if (this.isInWishlist(product)) {
      this.wishlist.deleteWishlist(product._id!).subscribe((result) => {
        this.wishlist.init();
      });
    } else {
      this.wishlist.addWishlist(product._id!).subscribe((result) => {
        this.wishlist.init();
      });
    }
  }

  isInWishlist(product: productType) {
    let productExists = this.wishlist.wishlists.find(x => x._id == product._id);
    if (productExists) return true;
    else return false;
  }

  addToCart(product: productType) {
    if (this.isInCart(product._id!)) {
      this.cart.deleteCart(product._id!).subscribe((result) => {
        this.cart.init();
      });
    } else {
      this.cart.addCart(product._id!, 1).subscribe((result) => {
        this.cart.init();
      });
    }
  }

  isInCart(productId: string) {
    if (this.cart.carts.find(x => productId == x.product._id)) return true;
    else return false;
  }
}
