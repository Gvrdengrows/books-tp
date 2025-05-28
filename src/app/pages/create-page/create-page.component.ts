import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Book } from '../../shared/models/book.model';
import { generateIsbn } from '../../shared/utils/generateIsbn';
import { BookService } from '../../shared/services/book.service';
import { generateId } from '../../shared/utils/generateId';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-page',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatLabel,
    MatButtonModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss',
})
export class CreateBookComponent {
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private _snackBar = inject(MatSnackBar);
  authors = signal<string[]>([]);
  categories = signal<string[]>([]);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  form = this.fb.group({
    _id: generateId(),
    title: [''],
    authors: [],
    categories: [],
    isbn: generateIsbn(),
    longDescription: '',
    pageCount: 0,
    date: '',
    publishedDate: {
      date: '',
    },
    shortDescription: '',
    status: '',
    thumbnailUrl: '',
  });

  postBook() {
    const newBook = this.form.value as Book;
    newBook.authors = this.authors();
    newBook.categories = this.categories();
    newBook.publishedDate.date = this.form.controls.date.value;
    this.bookService.postBook(newBook).subscribe(() => {
      this.openSnackBar('You published a book', 'Close');
    });
  }

  removeAuthors(keyword: string) {
    this.authors.update((author) => {
      const index = author.indexOf(keyword);
      if (index < 0) {
        return author;
      }

      author.splice(index, 1);
      return [...author];
    });
  }

  addAuthor(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.authors.update((author) => [...author, value]);
    }

    event.chipInput!.clear();
  }

  removeCategory(keyword: string) {
    this.categories.update((category) => {
      const index = category.indexOf(keyword);
      if (index < 0) {
        return category;
      }

      category.splice(index, 1);
      return [...category];
    });
  }

  addCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.categories.update((category) => [...category, value]);
    }

    event.chipInput!.clear();
  }
}
