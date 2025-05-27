import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAverageComponent } from './student-average.component';

describe('StudentAverageComponent', () => {
  let component: StudentAverageComponent;
  let fixture: ComponentFixture<StudentAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAverageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
