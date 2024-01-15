import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(record: User) {
    const API = 'auth/login';

    return this.http
      .post<{ user: User; token: string }>(API, record)
      .pipe(first());
  }

  signup(record: User) {
    const API = 'auth/signup';

    return this.http
      .post<{ user: User; token: string }>(API, record)
      .pipe(first());
  }

  logout() {
    localStorage.removeItem('token');
  }

  get isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
