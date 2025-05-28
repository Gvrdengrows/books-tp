import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BookService } from '../../shared/services/book.service';
import { Filter } from '../../shared/models/filter.model';
import { BookStateService } from '../../shared/services/book.state';

@Component({
  selector: 'app-filters',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButton,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private booksState = inject(BookStateService);

  public form = this.fb.group({ category: [], title: [], author: [] });

  find() {
    const filters = this.form.value as Filter;
    this.bookService.getFilteredBooks(filters).subscribe((books) => {
      this.booksState.updateBooks(books);
    });
  }
}
