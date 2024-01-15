import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, first, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly API = 'api/books';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient
      .get<Book[]>(this.API, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization:
            'Bearer ' +
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6Ik01UWkzRFNqcFY2SGM2SEc5SXhNcVdyciJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLmJvb2tzaGVsZi5jb20iLCJhdWQiOiJodHRwczpcL1wvZnJvbnRlbmQuYm9va3NoZWxmLmNvbSIsImp0aSI6Ik01UWkzRFNqcFY2SGM2SEc5SXhNcVdyciIsImlhdCI6MTcwNTMzNTg4OCwiZXhwIjoxNzA1MzM2MTg4LCJ1aWQiOjl9.3oDqLObP-Bj3myg5UEbQSzrisXEFOr9tSTEXHPfVk34',
        },
      })
      .pipe(
        first(),
        delay(1000),
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      );
  }

  save(record: Book) {
    console.log(record);
  }
}
