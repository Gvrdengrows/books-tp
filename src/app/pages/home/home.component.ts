import { Component, inject } from '@angular/core';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { BookService } from '../../shared/services/book.service';
import { AsyncPipe } from '@angular/common';
import { FiltersComponent } from '../../components/filters/filters.component';

@Component({
  selector: 'app-home',
  imports: [BookCardComponent, AsyncPipe, FiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private booksService = inject(BookService);

  public books$ = this.booksService.getAllBooks();
}
