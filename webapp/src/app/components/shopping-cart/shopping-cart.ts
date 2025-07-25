import { Component, inject, OnInit } from '@angular/core';
import { Cart } from '../../services/cart';
import { CommonModule, NgClass } from '@angular/common';
import { orderType, productType } from '../../dataTypes';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../services/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})
export class ShoppingCart implements OnInit {
  cart = inject(Cart);
  fb = inject(FormBuilder);
  order = inject(Order);
  router = inject(Router);
  orderStep: number = 0;
  selectedPayment: string = '';

  addressForm = this.fb.group({
    address1: [''],
    address2: [''],
    pincode: [''],
    city: ['']
  });

  ngOnInit(): void {
    this.cart.init();
  }
  get items() {
    return this.cart.carts;
  }

  selectPayment(method: string) {
    this.selectedPayment = method;
  }

  sellingPrice(product: productType) {
    return (+product.price - (+product.price * +product.discount) / 100)
  }

  addToCart(productId: string, quantity: number) {
    this.cart.addCart(productId, quantity).subscribe((result) => {
      this.cart.init();
    });
  }

  removeFromCart(productId: string) {
    this.cart.deleteCart(productId).subscribe((result) => {
      this.cart.init();
    })
  }

  get totalAmount() {
    let amount = 0;
    for (let index = 0; index < this.cart.carts.length; index++) {
      const element = this.cart.carts[index];
      amount += this.sellingPrice(element.product) * element.quantity;
    }
    return amount;
  }

  checkout() {
    this.orderStep = 1;
  }

  addAddress() {
    this.orderStep = 2;
  }

  completeOrder() {
    let order: orderType = {
      items: this.cart.carts,
      paymentType: this.selectedPayment,
      address: this.addressForm.value,
      date: new Date()
    }
    this.order.addOrder(order).subscribe((result) => {
      alert("your order is placed");
      this.cart.init();
      this.orderStep = 0;
      this.router.navigateByUrl('/orders');
    })
  }
}
