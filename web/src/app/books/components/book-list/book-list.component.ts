import { Component, ViewChild } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'totalPages',
    'actions',
  ];
  books: Book[];

  dataSource: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  bookSearch: Partial<Book> = {
    id: null,
    title: '',
    author: '',
    description: '',
  };

  constructor(
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.refreshList();
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onRemove(book: Book) {
    this.booksService.remove(book.id).subscribe(() => this.refreshList());
  }

  onEdit(book: Book) {
    this.router.navigate(['edit', book.id], { relativeTo: this.route });
  }

  onView(book: Book) {
    this.router.navigate(['details', book.id], { relativeTo: this.route });
  }

  private refreshList() {
    this.booksService.list().subscribe((books) => {
      this.books = books;
      this.dataSource = new MatTableDataSource(this.books);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private searchQuery() {
    this.booksService
      .search({
        ...this.bookSearch,
      })
      .subscribe((books) => {
        this.books = books;
        this.dataSource = new MatTableDataSource(this.books);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onIdSearch(e: any) {
    this.bookSearch = {
      ...this.bookSearch,
      id: parseInt(e.target.value),
    };
    this.searchQuery();
  }

  onTitleSearch(e: any) {
    this.bookSearch = {
      ...this.bookSearch,
      title: e.target.value,
    };

    this.searchQuery();
  }
  onAuthorSearch(e: any) {
    this.bookSearch = {
      ...this.bookSearch,
      author: e.target.value,
    };

    this.searchQuery();
  }
  onDescriptionSearch(e: any) {
    this.bookSearch = {
      ...this.bookSearch,
      description: e.target.value,
    };

    this.searchQuery();
  }
}
