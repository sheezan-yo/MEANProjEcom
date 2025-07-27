import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { Category } from '../../../services/category';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../services/product';
import { MatSelectModule } from '@angular/material/select';
import { brandType, categoryType } from '../../../dataTypes';
import { Brand } from '../../../services/brand';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductForm implements OnInit {
  brands: brandType[] = [];
  categories: categoryType[] = [];
  id!: string;
  fb = inject(FormBuilder);
  constructor(private product: Product, private category: Category, private brand: Brand, private router: Router, private route: ActivatedRoute) { }
  productForm = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(30)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.fb.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured: [false],
    isNewProduct: [false]
  });

  ngOnInit(): void {
    this.category.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.brand.getBrands().subscribe((result) => {
      this.brands = result;
    });
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.product.getProductById(this.id).subscribe((result) => {
        this.productForm.patchValue(result as any);
        for (let index = 0; index < result.images.length; index++) {
          this.addImage();
        }
      });
    } else {
      this.addImage();
    }
  }

  addPdt() {
    let value = this.productForm.value;
    this.product.addProduct(value as any).subscribe((result) => {
      alert("product added");
      this.router.navigate(["/admin/products"]);
    });
  }

  addImage() {
    this.images.push(this.fb.control(null));
  }

  removeImage() {
    this.images.removeAt(this.images.controls.length - 1);
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  updatePdt() {
    let value = this.productForm.value;
    this.product.updateProduct(this.id, value as any).subscribe((result) => {
      alert("product updated");
      this.router.navigate(["/admin/products"]);
    });
  }
}
