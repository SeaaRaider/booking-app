import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { LoginCredentials } from '../../models/AuthModel';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
loginData: LoginCredentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (response: any) => {
        console.log('Zalogowano pomyślnie!');
        //this.router.navigate(['']);
        console.log('Odpowiedź z serwera:', response);
        
      },
      error: (err: any) => {
        alert('Błąd logowania: ' + err.error.message);
      }
    });
  }
}
