import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  books$: Observable<Book[]>;
  displayedColumns: string[] = ['title', 'author', 'description', 'totalPages'];

  constructor(private booksService: BooksService) {
    this.books$ = this.booksService.list();
  }
}
