import { Component } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIcon, MatMiniFabButton, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
