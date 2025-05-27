import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-page',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatLabel,
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss',
})
export class CreateBookComponent {
  readonly reactiveKeywords = signal<string[]>([]);
  readonly formControl = new FormControl(['angular']);

  announcer = inject(LiveAnnouncer);

  removeReactiveKeyword(keyword: string) {
    this.reactiveKeywords.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from reactive form`);
      return [...keywords];
    });
  }

  addReactiveKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.reactiveKeywords.update((keywords) => [...keywords, value]);
      this.announcer.announce(`added ${value} to reactive form`);
    }

    event.chipInput!.clear();
  }
}
