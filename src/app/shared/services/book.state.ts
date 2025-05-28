import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookStateService {
  private booksSubject = new Subject<Book[]>();

  subscribeToBooks() {
    return this.booksSubject.asObservable();
  }

  updateBooks(books: Book[]) {
    this.booksSubject.next(books);
  }
}
