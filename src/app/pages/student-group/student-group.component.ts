import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-group',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-group.component.html',
  styleUrls: ['./student-group.component.css'],
})
export class StudentGroupComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}');

  get group(): string {
    return this.user.group || 'Not assigned';
  }

  get section(): string {
    return this.user.section || 'Not assigned';
  }
}
