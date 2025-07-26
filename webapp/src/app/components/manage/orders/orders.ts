import { Component, OnInit } from '@angular/core';
import { Order } from '../../../services/order';
import { orderType, productType } from '../../../dataTypes';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders implements OnInit {
  orders: orderType[] = [];
  constructor(private order: Order) { }

  ngOnInit(): void {
    this.order.getAdminOrder().subscribe((result) => {
      this.orders = result;
    });
  }

  sellingPrice(product: productType) {
    return (+product.price - (+product.price * +product.discount) / 100)
  }

  cancelOrder(id: string) {
    this.order.cancelOrder(id).subscribe((result) => {
      this.order.getAdminOrder().subscribe((result) => {
        this.orders = result;
      });
    });
  }

  statusChange(button: any, order: orderType) {
    this.order.updateOrderStatus(order._id!, button.value).subscribe((result) => {
      alert("Order Status Updated");
    });
  }
}
