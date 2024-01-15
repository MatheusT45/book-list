import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  books$: Observable<Book[]>;
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'description',
    'totalPages',
    'actions',
  ];

  constructor(
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.books$ = this.booksService.list();
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onRemove(book: Book) {
    this.booksService.remove(book).subscribe(() => {
      this.books$ = this.booksService.list();
    });
  }
}
