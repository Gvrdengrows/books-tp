import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { CreateBookComponent } from './pages/create-page/create-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'book/:isbn',
    component: BookPageComponent,
  },
  {
    path: 'create',
    component: CreateBookComponent,
  },
];
