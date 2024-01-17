import { Component, ViewChild } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

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

  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>([]);
  @ViewChild('paginator') paginator: MatPaginator;

  bookSearch = {
    id: null,
    title: '',
    author: '',
    description: '',
  };

  paginationData = {
    currentPage: 0,
    totalData: 0,
    totalPages: 0,
    pageSize: 0,
  };

  pageSizes = [3, 5, 10, 20];

  constructor(
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.previousPageLabel = 'Página anterior';

    this.refreshList();
  }

  private refreshList() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.booksService
            .list(
              this.bookSearch,
              this.paginator.pageIndex + 1,
              this.paginator.pageSize
            )
            .pipe(catchError(() => of(null)));
        }),
        map((response) => {
          if (response == null) return [];
          this.paginationData.totalData = parseInt(
            response.headers.get('X-Pagination-Total-Count')
          );
          return response.body;
        })
      )
      .subscribe((response) => {
        this.books = response;
        this.dataSource = new MatTableDataSource(this.books);
      });
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

  private searchQuery() {
    this.booksService
      .list(this.bookSearch, 1, this.paginator.pageSize)
      .subscribe((response) => {
        console.log(this.paginator, this.paginationData);
        this.paginator.pageIndex = 0;
        this.books = response.body;
        this.dataSource = new MatTableDataSource(this.books);
        this.paginationData.totalData = parseInt(
          response.headers.get('X-Pagination-Total-Count')
        );
      });
  }

  onSearch(e: any) {
    this.bookSearch = {
      ...this.bookSearch,
    };

    this.bookSearch[e.target.name] = e.target.value;
    this.searchQuery();
  }
}
