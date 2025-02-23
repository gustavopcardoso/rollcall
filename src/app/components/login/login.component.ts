import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginMessage = '';
  loginSuccess = false;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      
      this.authService.login(
        this.loginForm.value.email!,
        this.loginForm.value.password!
      ).subscribe({
        next: (response) => {
          this.loginSuccess = true;
          sessionStorage.setItem('authToken', response.token);
          sessionStorage.setItem('tenantName', response.tenant.nome);
          this.router.navigate(['/dashboard']);
        },
        error: () => {          
          this.loginMessage = 'Erro ao efetuar login. Verifique suas credenciais!';
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}
