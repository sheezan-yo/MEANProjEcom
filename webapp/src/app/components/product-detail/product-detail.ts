import { Component, OnInit } from '@angular/core';
import { Customer } from '../../services/customer';
import { ActivatedRoute } from '@angular/router';
import { categoryType, productType } from '../../dataTypes';
import { CommonModule } from '@angular/common';
import { Category } from '../../services/category';
import { ProductCard } from '../product-card/product-card';
import { WishlistCart } from '../../services/wishlist-cart';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, ProductCard],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {
  product!: productType;
  category!: any;
  similarProd: productType[] = [];
  constructor(private customer: Customer, private route: ActivatedRoute, private wishlist: WishlistCart, private cart: Cart) { }


  ngOnInit(): void {
    this.route.params.subscribe((x: any) => {
      this.getProductDet(x.id);
    });
  }

  getProductDet(id: string) {
    this.customer.getProductById(id).subscribe((result) => {
      this.product = result;
      this.customer.getCategory(result.categoryId).subscribe((res) => {
        this.category = res;
      });
      this.customer.getProducts('', this.product.categoryId, 1, 4, '', -1, '').subscribe((res) => {
        this.similarProd = res;
      });
    });
  }

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
