import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, first, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly API = '/assets/books.json';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Book[]>(this.API).pipe(
      first(),
      delay(1000),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }
}
