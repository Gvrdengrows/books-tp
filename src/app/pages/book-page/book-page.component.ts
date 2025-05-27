import { Component, inject, Input } from '@angular/core';
import { BookService } from '../../shared/services/book.service';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Book } from '../../shared/models/book.model';

@Component({
  selector: 'app-book',
  imports: [AsyncPipe, NgIf, DatePipe],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss',
})
export class BookPageComponent {
  private booksService = inject(BookService);
  @Input()
  set isbn(isbn: string) {
    this.book$ = this.booksService.getBook(isbn);
  }
  book$: Observable<Book | undefined>;
}
