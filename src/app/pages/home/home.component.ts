import { Component, inject, OnInit } from '@angular/core';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { BookService } from '../../shared/services/book.service';
import { AsyncPipe } from '@angular/common';
import { FiltersComponent } from '../../components/filters/filters.component';
import { BookStateService } from '../../shared/services/book.state';

@Component({
  selector: 'app-home',
  imports: [BookCardComponent, AsyncPipe, FiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private booksService = inject(BookService);
  private booksState = inject(BookStateService);

  public books$ = this.booksState.subscribeToBooks();

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe((books) => {
      this.booksState.updateBooks(books);
    });
  }
}
