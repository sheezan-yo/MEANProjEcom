import { Component, inject, OnInit } from '@angular/core';
import { WishlistCart } from '../../services/wishlist-cart';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-wishlists',
  imports: [ProductCard],
  templateUrl: './wishlists.html',
  styleUrl: './wishlists.scss'
})
export class Wishlists implements OnInit {
  wishlist = inject(WishlistCart);
  ngOnInit(): void {
    this.wishlist.init();
  }
}
