import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { Category } from '../../../services/category';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Brand } from '../../../services/brand';

@Component({
  selector: 'app-brand-form',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.scss'
})
export class BrandForm implements OnInit {
  name!: string
  isEdit = false;
  id!: string;
  constructor(private brand: Brand, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.isEdit = true;
      this.brand.getBrandById(this.id).subscribe((result) => {
        this.name=result.name;
      });
    }

  }

  add() {
    this.brand.addBrand(this.name).subscribe((result) => {
      alert("Brand added");
      this.router.navigate(["/admin/brands"]);
    });
  }

  update() {
    this.brand.updateBrand(this.id, this.name).subscribe((result) => {
      alert("Brand updated");
      this.router.navigate(["/admin/brands"]);
    })
  }
}
