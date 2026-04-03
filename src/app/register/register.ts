import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { LoginData } from '../../interfaces/LoginInterface';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  isConfirmPasswordWrong: boolean = false;
  
  tempRegisterData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  registerData: LoginData = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if(this.tempRegisterData.valid) {
      if(this.tempRegisterData.controls.password.value === this.tempRegisterData.controls.confirmPassword.value) {
        this.registerData.email = this.tempRegisterData.controls.email.value!;
        this.registerData.password = this.tempRegisterData.controls.password.value!;
        this.register(this.registerData);
        this.isConfirmPasswordWrong = false;
      } else {
        this.isConfirmPasswordWrong = true;
      }
    } else {
      this.tempRegisterData.markAllAsTouched();
    }
  }

  register(credentials: LoginData) {
    this.authService.register(credentials).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      
      error: (err: any) => {
        alert('Błąd rejestracji: ' + err.error.message);
      }
    });
  }
}