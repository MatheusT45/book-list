import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, first, of } from 'rxjs';
import { Router } from '@angular/router';
import { camelCaseKeysToUnderscore } from '../../helpers/string.helper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly API = 'api/books';

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  list(perPage = 100, page = 1): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${this.API}?per-page=${perPage}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        first(),
        catchError((error) => this.errorCatcher(error))
      );
  }

  search(book: Partial<Book>): Observable<Book[]> {
    const { id, title, author, description } = book;
    const term =
      `${id ? `&filter[id][in][]=${id}` : ''}` +
      `${title ? `&filter[title][like]=${title}` : ''}` +
      `${author ? `&filter[author][like]=${author}` : ''}` +
      `${description ? `&filter[description][like]=${description}` : ''}`;

    return this.http
      .get<Book[]>(`${this.API}?per-page=100&sort=id${term}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        first(),
        catchError((error) => this.errorCatcher(error))
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
        catchError((error) => this.errorCatcher(error))
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
        catchError((error) => this.errorCatcher(error))
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
        catchError((error) => this.errorCatcher(error))
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
        catchError((error) => this.errorCatcher(error))
      );
  }

  private errorCatcher(error: any): Observable<null> {
    if (error.status === 401) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);

      this._snackBar.open(error.message, 'Close');

      return of(null);
    }

    this._snackBar.open(
      error.error.map((e) => e.message),
      'Close'
    );
    return of(null);
  }
}
