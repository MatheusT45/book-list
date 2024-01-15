import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { catchError, first, of } from 'rxjs';
import { Router } from '@angular/router';
import { camelCaseKeysToUnderscore } from '../../helpers/string.helper';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly API = 'api/books';

  constructor(private http: HttpClient, private router: Router) {}

  list() {
    return this.http
      .get<Book[]>(this.API, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
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

  save(record: Book) {
    const snakeCasedRecord = camelCaseKeysToUnderscore(record);
    return this.http
      .post<Book>(this.API, snakeCasedRecord, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
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

  remove(record: Book) {
    return this.http
      .delete<Book>(this.API + '/' + record.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
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
}
