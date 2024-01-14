import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly API = '/assets/books.json';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Book[]>(this.API).pipe(first(), delay(2000));
  }
}
