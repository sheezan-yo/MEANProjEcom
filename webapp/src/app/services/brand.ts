import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { brandType } from '../dataTypes';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Brand {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getBrands() {
    return this.http.get<brandType[]>(this.url + '/brand');
  }

  getBrandById(id: string) {
    return this.http.get<brandType>(this.url + '/brand/' + id);
  }

  addBrand(name: string) {
    return this.http.post(this.url + '/brand', {
      name: name,
    });
  }

  updateBrand(id: string, name: string) {
    return this.http.put(this.url + '/brand/' + id, {
      name: name,
    });
  }

  deleteBrandById(id: string) {
    return this.http.delete(this.url + '/brand/' + id);
  }
}
