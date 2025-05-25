import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-demand-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './student-demand-history.component.html',
  styleUrls: ['./student-demand-history.component.css'],
})
export class StudentDemandHistoryComponent implements OnInit {
  demands: any[] = [];
  loading = true;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('http://localhost:3000/api/v1/demandes/get-student-demands', {
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          this.demands = res.demands;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load demands:', err);
          this.error = 'Could not load your demands.';
          this.loading = false;
        },
      });
  }

  requestNewCertificate(): void {
    this.successMessage = null;
    this.error = null;

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
          this.successMessage = 'New certificate request submitted.';
          this.ngOnInit(); // reload table
        },
        error: (err) => {
          console.error('Request error:', err);
          this.error = err?.error?.message || 'Failed to submit request.';
        },
      });
  }
  viewCertificate(imagePath: string): void {
    const sanitizedPath = imagePath.replace(/\\/g, '/'); // Convert backslashes to slashes
    const fullUrl = `http://localhost:3000/${sanitizedPath}`;
    window.open(fullUrl, '_blank');
  }
}
