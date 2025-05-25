import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDemandHistoryComponent } from './student-demand-history.component';

describe('StudentDemandHistoryComponent', () => {
  let component: StudentDemandHistoryComponent;
  let fixture: ComponentFixture<StudentDemandHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDemandHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDemandHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
