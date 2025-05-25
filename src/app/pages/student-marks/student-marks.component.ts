import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ModuleMark {
  name: string;
  td?: string;
  exam?: string;
  ratrappage?: string;
}

@Component({
  selector: 'app-student-marks',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './student-marks.component.html',
  styleUrls: ['./student-marks.component.css'],
})
export class StudentMarksComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user') || '{}');
  marksGrouped: ModuleMark[] = [];
  errorMessage: string | null = null;
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('http://localhost:3000/api/v1/students/get-marks', {
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          const rawMarks = res.marks;
          const moduleMap = new Map<string, ModuleMark>();

          rawMarks.forEach((m: any) => {
            const moduleName = m.moduleId.name;
            const markType = m.markType;
            const mark = m.mark;

            if (!moduleMap.has(moduleName)) {
              moduleMap.set(moduleName, { name: moduleName });
            }

            const record = moduleMap.get(moduleName)!;
            if (markType === 'td') record.td = mark;
            if (markType === 'exam') record.exam = mark;
            if (markType === 'ratrappage') record.ratrappage = mark;
          });

          this.marksGrouped = Array.from(moduleMap.values());
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load marks.';
          this.loading = false;
        },
      });
  }
}
