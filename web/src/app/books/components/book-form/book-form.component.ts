import { AuthService } from './../../../auth/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-form',
  standalone: false,
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  isViewing = this.route.snapshot.url[0].path === 'details';

  form = this.formBuilder.group({
    title: new FormControl({ value: '', disabled: this.isViewing }),
    author: new FormControl({ value: '', disabled: this.isViewing }),
    description: new FormControl({ value: '', disabled: this.isViewing }),
    totalPages: new FormControl({ value: null, disabled: this.isViewing }),
  });

  bookCreatedTime: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: BooksService,
    private authService: AuthService
  ) {
    if (this.route.snapshot.params['id']) {
      this.service.get(this.route.snapshot.params['id']).subscribe((book) => {
        this.form.patchValue(book);
        this.bookCreatedTime = book.createdAt.toLocaleString();
      });
    }
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.route.snapshot.params['id']) {
      this.service
        .update(this.route.snapshot.params['id'], this.form.value)
        .subscribe((response) => {
          if (response !== null)
            this.router.navigate(['/'], { relativeTo: this.route });
        });
      return;
    }
    this.service.save(this.form.value).subscribe((response) => {
      if (response !== null)
        this.router.navigate(['/'], { relativeTo: this.route });
    });
  }

  onCancel() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}
