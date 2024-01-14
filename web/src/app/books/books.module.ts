import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { MatTableModule } from '@angular/material/table';
import { BooksComponent } from './books/books.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [BooksComponent],
  imports: [CommonModule, BooksRoutingModule, MatTableModule, MatCardModule],
})
export class BooksModule {}
