import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);

  getAllBooks() {
    return this.http.get<Book[]>('http://localhost:8000/books');
  }

  getBook(isbn: string) {
    return this.http
      .get<Book[]>('http://localhost:8000/books')
      .pipe(map((books) => books.find((v) => v.isbn == isbn)));
  }
}
