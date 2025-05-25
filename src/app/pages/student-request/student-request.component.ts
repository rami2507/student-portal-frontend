import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './student-request.component.html',
  styleUrls: ['./student-request.component.css'],
})
export class StudentRequestComponent {
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  submitRequest(): void {
    this.successMessage = null;
    this.errorMessage = null;

    this.http
      .post(
        'http://localhost:3000/api/v1/demandes',
        {},
        {
          withCredentials: true,
        }
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Your request was submitted successfully.';
        },
        error: (err) => {
          console.error('Request error:', err);
          this.errorMessage =
            err?.error?.message || 'Failed to submit your request.';
        },
      });
  }
}
