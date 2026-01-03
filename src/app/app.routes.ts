import { Routes } from '@angular/router';
import { MainContent } from './main-content/main-content';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
    {path: '', component: MainContent},
    {path: 'login', component: Login},
    {path: 'register', component: Register}
];
