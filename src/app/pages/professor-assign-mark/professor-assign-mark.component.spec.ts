import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorAssignMarkComponent } from './professor-assign-mark.component';

describe('ProfessorAssignMarkComponent', () => {
  let component: ProfessorAssignMarkComponent;
  let fixture: ComponentFixture<ProfessorAssignMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorAssignMarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorAssignMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
