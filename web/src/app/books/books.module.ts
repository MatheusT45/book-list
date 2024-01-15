import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './components/book-list/book-list.component';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BookFormComponent } from './components/book-form/book-form.component';

@NgModule({
  declarations: [BookListComponent, BookFormComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
})
export class BooksModule {}
