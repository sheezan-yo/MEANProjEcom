import { Component, OnInit } from '@angular/core';
import { Customer } from '../../services/customer';
import { brandType, categoryType, productType } from '../../dataTypes';
import { ProductCard } from '../product-card/product-card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {
  searchTerm: string = '';
  categoryId: string = '';
  page: number = 1;
  pageSize: number = 6;
  sortBy: string = '';
  sortOrder: number = -1;
  brandId: string = '';
  products: productType[] = [];
  categories: categoryType[] = [];
  brands: brandType[] = [];

  constructor(private customer: Customer, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.customer.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.customer.getBrands().subscribe((result) => {
      this.brands = result;
    });

    this.route.queryParams.subscribe((x: any) => {
      this.searchTerm = x.search || '';
      console.log(this.searchTerm);
      this.categoryId = x.categoryId || '';

      this.getProducts();
    });
  }

  orderChange(e: number) {
    this.sortBy = 'price',
      this.sortOrder = +e;
    console.log('Sorting by:', this.sortBy, 'Order:', this.sortOrder);
    this.getProducts();
  }

  pageChange(page: number) {
    this.page = page;
    this.getProducts()
  }

  getProducts() {
    setTimeout(() => {
      this.customer.getProducts(this.searchTerm, this.categoryId, this.page, this.pageSize, this.sortBy, this.sortOrder, this.brandId).subscribe((result) => {
        console.log(result);
        this.products = result;
      });
    }, 200);
  }
}
