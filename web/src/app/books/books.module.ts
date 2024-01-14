import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books/books.component';

import { AppMaterialModule } from '../shared/app-material/app-material.module';

@NgModule({
  declarations: [BooksComponent],
  imports: [CommonModule, BooksRoutingModule, AppMaterialModule],
})
export class BooksModule {}
