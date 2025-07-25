import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string) {
    return this.http.post(this.url + "/auth/register", {
      name, email, password,
    });
  }

  login(email: string, password: string) {
    return this.http.post(this.url + "/auth/login", {
      email, password,
    });
  }

  get isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  get isAdmin() {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).isAdmin;
    }
    return false;
  }

  get userName() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).name;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
