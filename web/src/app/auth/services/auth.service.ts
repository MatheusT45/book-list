import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, first, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(record: User) {
    const API = 'auth/login';

    return this.httpClient
      .post<{ user: User; token: string }>(API, record, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .pipe(first());
  }

  signup(record: User) {
    const API = 'auth/signup';

    return this.httpClient
      .post<{ user: User; token: string }>(API, record, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .pipe(first());
  }
}
