import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 this is the fix

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule, // 👈 add this to support *ngIf
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  apiError: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      matricule_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['student', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.apiError = null;
    this.successMessage = null;

    if (this.signupForm.valid) {
      this.http
        .post(
          'http://localhost:3000/api/v1/users/signup',
          this.signupForm.value
        )
        .subscribe({
          next: () => {
            this.successMessage = 'Signup successful! Redirecting to login...';
            setTimeout(() => this.router.navigate(['/login']), 1500);
          },
          error: (err) => {
            this.apiError =
              err?.error?.message ||
              'A server error occurred. Please try again later.';
            console.error('Signup error:', err);
          },
        });
    }
  }
}
