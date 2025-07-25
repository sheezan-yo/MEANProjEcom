import { Component, OnInit } from '@angular/core';
import { orderType, productType } from '../../dataTypes';
import { Order } from '../../services/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  imports: [CommonModule],
  templateUrl: './customer-orders.html',
  styleUrl: './customer-orders.scss'
})
export class CustomerOrders implements OnInit {
  orders: orderType[] = [];
  constructor(private order: Order) { }

  ngOnInit(): void {
    this.order.getCustomerOrders().subscribe((result) => {
      this.orders = result;
    });
  }
  sellingPrice(product: productType) {
    return (+product.price - (+product.price * +product.discount) / 100)
  }

  cancelOrder(id: string) {
    this.order.cancelOrder(id).subscribe((result) => {
      this.order.getCustomerOrders().subscribe((result) => {
        this.orders = result;
      });
    });
  }
}
