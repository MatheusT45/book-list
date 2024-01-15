import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-form',
  standalone: false,
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: BooksService
  ) {
    this.form = this.formBuilder.group({
      title: [null],
      author: [null],
      description: [null],
      totalPages: [null],
    });
  }

  onSubmit() {
    this.service.save(this.form.value);
  }

  onCancel() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}
