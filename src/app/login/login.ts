import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { LoginData } from '../../interfaces/LoginInterface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  
  loginData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if(this.loginData.valid) {
      this.login(this.loginData.value as LoginData);
    }
  }

  login(credentials: LoginData) {
    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        this.router.navigate(['']);
        console.log('Odpowiedź z serwera:', response);
      },
      
      error: (err: any) => {
        alert('Błąd logowania: ' + err.error.message);
      }
    });
  }
}
