import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Book } from '../../shared/models/book.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-card',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;

  formControl = new FormControl();

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((v) => console.log(v));
  }

  goToBookDetails(isbp: string) {}
}
