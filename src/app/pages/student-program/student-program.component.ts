import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-program',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './student-program.component.html',
  styleUrls: ['./student-program.component.css'],
})
export class StudentProgramComponent implements OnInit {
  imageUrl: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('http://localhost:3000/api/v1/emploies/getUserEmploie', {
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          const rawPath = res?.emploie?.image;
          if (rawPath) {
            const sanitized = rawPath.replace(/\\/g, '/');
            this.imageUrl = `http://localhost:3000/${sanitized}`;
          }
        },
        error: (err) => {
          if (err.status === 404) {
            this.errorMessage = 'No program available for your group yet.';
          } else {
            this.errorMessage = 'Failed to load your program.';
          }
        },
      });
  }
}
