import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-customer-profile',
  imports: [],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.scss'
})
export class CustomerProfile implements OnInit {
  name: string = '';
  email: string = '';
  ngOnInit() {
    let user = localStorage.getItem('user');
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
    }
  }
}
