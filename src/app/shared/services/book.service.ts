import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { filter, map } from 'rxjs';
import { Filter } from '../models/filter.model';

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

  getFilteredBooks(filters: Filter) {
    return this.http.get<Book[]>('http://localhost:8000/books').pipe(
      map((books) => {
        const res: Book[] = [];
        const { title, author, category } = filters;
        books.forEach((book) => {
          if (book.title.includes(title) && title) {
            res.push(book);
          }
          if (book.categories.includes(category) && category) {
            res.push(book);
          }
          if (book.authors.includes(author) && author) {
            res.push(book);
          }
        });

        return res;
      }),
    );
  }

  postBook(book: Book) {
    return this.http.post('http://localhost:8000/books', book);
  }
}
