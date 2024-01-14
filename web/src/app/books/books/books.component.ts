import { Component } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  displayedColumns: string[] = ['title', 'author', 'description', 'totalPages'];
  books: Book[] = [
    {
      id: 1,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      description:
        'The hobbit tells a fantastic story of adventure, danger, friendship, and courage, and serves as a prequel to the even more immersive and epic book series, the Lord of the Rings.',
      totalPages: 310,
    },
    {
      id: 2,
      title: 'Percy Jackson and the Olympians',
      author: 'Rick Riordan',
      description:
        'Percy Jackson is a good kid, but he cant seem to focus on his schoolwork or control his temper. And lately, being away at boarding school is only getting worse - Percy could have sworn his pre-algebra teacher turned into a monster and tried to kill him.',
      totalPages: 375,
    },
  ];
}
