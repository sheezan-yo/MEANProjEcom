import { Component, OnInit } from '@angular/core';
import { Customer } from '../../services/customer';
import { productType } from '../../dataTypes';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { RouterLink } from '@angular/router';
import { WishlistCart } from '../../services/wishlist-cart';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  newProducts: productType[] = [];
  featuredProducts: productType[] = [];
  constructor(private customer: Customer, private wishlist: WishlistCart, private cart: Cart) { }

  ngOnInit(): void {
    this.customer.getNewProduct().subscribe((result) => {
      this.newProducts = result;
    });
    this.customer.getFeaturedProduct().subscribe((result) => {
      this.featuredProducts = result;
    });
  }
}
