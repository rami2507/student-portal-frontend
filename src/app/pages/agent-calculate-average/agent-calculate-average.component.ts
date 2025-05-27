import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-calculate-average',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './agent-calculate-average.component.html',
  styleUrls: ['./agent-calculate-average.component.css'],
})
export class AgentCalculateAverageComponent implements OnInit {
  form: FormGroup;
  students: { _id: string; name: string }[] = [];
  average: number | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      studentId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.http
      .get<any>('http://localhost:3000/api/v1/users/allstudents', {
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          this.students = res.students || [];
        },
        error: () => {
          this.error = 'Failed to load student list.';
        },
      });
  }

  calculateAverage(): void {
    this.average = null;
    this.error = null;

    if (this.form.valid) {
      const payload = { studentId: this.form.value.studentId };
      this.http
        .post<any>(
          'http://localhost:3000/api/v1/students/calculate-average-mark',
          payload,
          {
            withCredentials: true,
          }
        )
        .subscribe({
          next: (res) => {
            this.average = res.averageMark || null;

            if (this.average !== null) {
              const rounded = Math.round(this.average * 100) / 100;
              window.alert(`✅ Average calculated successfully: ${rounded}`);
            }
          },
          error: (err) => {
            this.error = err?.error?.message || 'Failed to calculate average.';
          },
        });
    }
  }
}
