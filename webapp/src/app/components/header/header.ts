import { Component, inject, OnInit } from '@angular/core';
import { categoryType } from '../../dataTypes';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Customer } from '../../services/customer';
import { FormsModule, } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  categories!: categoryType[];
  auth = inject(Auth);
  searchTerm!: string;
  constructor(private customer: Customer, private router: Router) { }

  ngOnInit(): void {
    this.customer.getCategories().subscribe((result) => {
      this.categories = result;
    });
  }

  home() {
    this.router.navigate(['/']);
  }

  onSearch(e: any) {
    if (e.target.value)
      this.searchTerm = e.target.value;
    this.router.navigateByUrl("/products?search=" + this.searchTerm);
    e.preventDefault();
  }

  searchCat(id: string) {
    this.searchTerm = "";
    this.customer.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.router.navigateByUrl("/products?categoryId=" + id);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
