import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { WishlistCart } from './services/wishlist-cart';
import { Cart } from './services/cart';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'webapp';
  constructor(private wishlist: WishlistCart, private cart: Cart, private auth: Auth) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
      this.wishlist.init();
      this.cart.init();
    }
  }
}
