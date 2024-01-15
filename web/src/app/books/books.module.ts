import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './components/book-list/book-list.component';

import { AppMaterialModule } from '../shared/app-material/app-material.module';

@NgModule({
  declarations: [BookListComponent],
  imports: [CommonModule, BooksRoutingModule, AppMaterialModule],
})
export class BooksModule {}
