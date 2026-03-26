import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { LoginCredentials } from '../models/AuthModel';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://twoje-api.pl/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post(`${this.API_URL}/register`, userData);
  }

  login(credentials: LoginCredentials) {
    return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.loggedIn.next(true);
        
        return res;
      })
    );
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}