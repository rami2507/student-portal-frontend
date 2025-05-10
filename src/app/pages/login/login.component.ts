import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  apiError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      matricule_id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.apiError = null;

    if (this.loginForm.valid) {
      this.http
        .post(
          'http://localhost:3000/api/v1/users/login',
          this.loginForm.value,
          { withCredentials: true } // ✅ allow cookies if needed
        )
        .subscribe({
          next: (res: any) => {
            const user = res?.data?.user;
            const token = res?.token;

            if (user && token) {
              // ✅ Store user session
              localStorage.setItem('token', token);
              localStorage.setItem('role', user.role);
              localStorage.setItem('user', JSON.stringify(user));

              // ✅ Redirect to role-based page
              this.router.navigate([`/${user.role}`]);
            } else {
              this.apiError = 'Login succeeded but user data is missing.';
            }
          },
          error: (err) => {
            this.apiError =
              err?.error?.message || 'Login failed. Please try again later.';
            console.error('Login error:', err);
          },
        });
    }
  }
}
