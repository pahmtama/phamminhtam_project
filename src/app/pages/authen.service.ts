import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
      // parse token
      console.log(token);
      return true;
    }
    return false;
  }

  BASE_API = environment.api_url + 'Auth/';
  api = {
    login: this.BASE_API + 'login',
    register: this.BASE_API + 'register',
    getById: this.BASE_API,

  };
  constructor(
    private http: HttpClient,
  ) {}

  getUserById(id: number) {
    return this.http.get(this.api.getById + id);
  }

  login(data: any) {
    return this.http.post(this.api.login, data);
  }

  register(data: any) {
    return this.http.post(this.api.register, data);
  }


  getUserName() {
    const token = localStorage.getItem('token');
    if (token) {
      // parse token
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.username;
    }
    return '';
  }
}
