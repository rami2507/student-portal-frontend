import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-review-demands',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './review-demands.component.html',
  styleUrls: ['./review-demands.component.css'],
})
export class ReviewDemandsComponent implements OnInit {
  demands: any[] = [];
  loading = true;
  error: string | null = null;
  success: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDemands();
  }

  loadDemands(): void {
    this.loading = true;
    this.http
      .get<any>('http://localhost:3000/api/v1/demandes/get-demands', {
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.demands = res.demands;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Could not load student demands.';
          this.loading = false;
        },
      });
  }

  acceptDemand(demandId: string): void {
    this.http
      .post<any>(
        'http://localhost:3000/api/v1/demandes/accept',
        { demandId },
        {
          withCredentials: true,
        }
      )
      .subscribe({
        next: (res) => {
          window.alert(res.message || 'Demand accepted successfully.'); // ✅ Alert
          this.loadDemands();
        },
        error: (err) => {
          const message = err?.error?.message || 'Failed to accept demand.';
          window.alert(message); // ✅ Alert error
          this.loadDemands(); // Optional: still refresh
        },
      });
  }

  rejectDemand(demandId: string): void {
    this.http
      .post<any>(
        'http://localhost:3000/api/v1/demandes/reject',
        { demandId },
        {
          withCredentials: true,
        }
      )
      .subscribe({
        next: (res) => {
          window.alert(res.message || 'Demand rejected successfully.'); // ✅ Alert
          this.loadDemands();
        },
        error: (err) => {
          const message = err?.error?.message || 'Failed to reject demand.';
          window.alert(message); // ✅ Alert error
          this.loadDemands();
        },
      });
  }
}
