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
  form = this.formBuilder.group({
    title: [''],
    author: [''],
    description: [''],
    totalPages: [0],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: BooksService
  ) {}

  onSubmit() {
    this.service.save(this.form.value).subscribe();
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}
