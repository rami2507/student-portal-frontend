import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { ProfessorDashboardComponent } from './pages/professor-dashboard/professor-dashboard.component';
import { AgentDashboardComponent } from './pages/agent-dashboard/agent-dashboard.component';
import { StudentGroupComponent } from './pages/student-group/student-group.component';
import { StudentMarksComponent } from './pages/student-marks/student-marks.component';
import { StudentProgramComponent } from './pages/student-program/student-program.component';
import { StudentRequestComponent } from './pages/student-request/student-request.component';
import { StudentDemandHistoryComponent } from './pages/student-demand-history/student-demand-history.component';
import { ReviewDemandsComponent } from './pages/review-demands/review-demands.component';
import { ProfessorAssignMarkComponent } from './pages/professor-assign-mark/professor-assign-mark.component';
import { AgentCalculateAverageComponent } from './pages/agent-calculate-average/agent-calculate-average.component';
import { StudentAverageComponent } from './pages/student-average/student-average.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'student', component: StudentDashboardComponent }, // create these
  { path: 'agent', component: AgentDashboardComponent },
  { path: 'professor', component: ProfessorDashboardComponent },
  { path: 'student/group', component: StudentGroupComponent },
  { path: 'student/grades', component: StudentMarksComponent },
  { path: 'student/program', component: StudentProgramComponent },
  { path: 'student/request-certificate', component: StudentRequestComponent },
  { path: 'student/my-demands', component: StudentDemandHistoryComponent },
  { path: 'agent/review-demands', component: ReviewDemandsComponent },
  { path: 'professor/assign-mark', component: ProfessorAssignMarkComponent },
  {
    path: 'agent/calculate-average',
    component: AgentCalculateAverageComponent,
  },
  { path: 'student/average', component: StudentAverageComponent },
];
