import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { categoryType } from '../dataTypes';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Category {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<categoryType[]>(this.url + '/category');
  }

  getCategoryById(id: string) {
    return this.http.get<categoryType>(this.url + '/category/' + id);
  }

  addCategory(name: string) {
    return this.http.post(this.url + '/category', {
      name: name,
    });
  }

  updateCategory(id: string, name: string) {
    return this.http.put(this.url + '/category/' + id, {
      name: name,
    });
  }

  deleteCategoryById(id: string) {
    return this.http.delete(this.url + '/category/' + id);
  }

}

