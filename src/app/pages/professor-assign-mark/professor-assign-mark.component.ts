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
  selector: 'app-professor-assign-mark',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './professor-assign-mark.component.html',
  styleUrls: ['./professor-assign-mark.component.css'],
})
export class ProfessorAssignMarkComponent implements OnInit {
  assignForm: FormGroup;
  students: { _id: string; name: string }[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.assignForm = this.fb.group({
      studentId: ['', Validators.required],
      mark: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      markType: ['', Validators.required], // ✅ new field
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
        error: (err) => {
          console.error('Failed to load students:', err);
          this.errorMessage = 'Unable to fetch student list.';
        },
      });
  }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.assignForm.valid) {
      this.http
        .post(
          'http://localhost:3000/api/v1/professors/assign-mark',
          this.assignForm.value,
          {
            withCredentials: true,
          }
        )
        .subscribe({
          next: (res: any) => {
            this.successMessage = res.message || 'Mark assigned successfully.';
            this.assignForm.reset();
          },
          error: (err) => {
            this.errorMessage = err?.error?.message || 'Failed to assign mark.';
          },
        });
    }
  }
}
