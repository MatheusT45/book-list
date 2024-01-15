import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, first, of } from 'rxjs';
import { Router } from '@angular/router';
import { camelCaseKeysToUnderscore } from '../../helpers/string.helper';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly API = 'api/books';

  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<Book[]> {
    return this.http
      .get<Book[]>(this.API, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        first(),
        catchError((error) => {
          if (error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          console.log(error);
          return of([]);
        })
      );
  }

  get(id: number): Observable<Book> {
    return this.http
      .get<Book>(`${this.API}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        first(),
        catchError((error) => {
          if (error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          console.log(error);
          return of(null);
        })
      );
  }

  save(record: Partial<Book>): Observable<Book> {
    const snakeCasedRecord = camelCaseKeysToUnderscore(record);
    return this.http
      .post<Book>(this.API, snakeCasedRecord, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        first(),
        catchError((error) => {
          if (error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          console.log(error);
          return of(null);
        })
      );
  }

  update(id: number, record: Partial<Book>): Observable<Book> {
    const snakeCasedRecord = camelCaseKeysToUnderscore(record);
    return this.http
      .put<Book>(`${this.API}/${id}`, snakeCasedRecord, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        first(),
        catchError((error) => {
          if (error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          console.log(error);
          return of(null);
        })
      );
  }

  remove(id: number): Observable<null> {
    return this.http
      .delete<null>(`${this.API}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        first(),
        catchError((error) => {
          if (error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          console.log(error);
          return of(null);
        })
      );
  }
}
