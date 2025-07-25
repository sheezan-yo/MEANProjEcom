import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { productType } from '../../../dataTypes';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../../services/product';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterLink, MatButtonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  displayedColumns: string[] = ['id', 'name', 'shortDescription', 'price', 'discount', 'action'];
  dataSource: MatTableDataSource<productType>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private product: Product, private router: Router) {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.apiCall();
  }

  apiCall() {
    this.product.getProducts().subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePdt(id: string) {
    this.product.deleteProductById(id).subscribe((result) => {
      alert("Product deleted");
      this.apiCall();
    });
  }
}
