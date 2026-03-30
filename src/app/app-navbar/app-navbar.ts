import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/AuthService';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './app-navbar.html',
  styleUrl: './app-navbar.scss',
})
export class AppNavbar {

  isLoggedIn$ : Observable<boolean>;
  isMenuOpen: boolean = false;

  constructor(private authService: AuthService) {
  this.isLoggedIn$ = this.authService.isLoggedIn();}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    console.log(this.isLoggedIn$);
  }
}
