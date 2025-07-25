import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { Category } from '../../../services/category';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm implements OnInit {
  name!: string
  isEdit = false;
  id!: string;
  constructor(private category: Category, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.isEdit = true;
      this.category.getCategoryById(this.id).subscribe((result) => {
        this.name = result.name;
      });
    }

  }

  add() {
    this.category.addCategory(this.name).subscribe((result) => {
      alert("category added");
      this.router.navigate(["/admin/categories"]);
    });
  }

  update() {
    this.category.updateCategory(this.id, this.name).subscribe((result) => {
      alert("category updated");
      this.router.navigate(["/admin/categories"]);
    })
  }
}
