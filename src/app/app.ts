import { Component, signal } from '@angular/core';
import { AppNavbar } from './app-navbar/app-navbar';
import { RouterOutlet } from '@angular/router';
import { AppFooter } from './app-footer/app-footer';

@Component({
  selector: 'app-root',
  imports: [AppNavbar, AppFooter, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app');
}
