import { Component, ViewChild } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

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

  private refreshList() {
    this.booksService.list().subscribe((books) => {
      this.books = books;
      this.dataSource = new MatTableDataSource(this.books);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
