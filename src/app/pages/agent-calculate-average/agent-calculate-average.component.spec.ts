import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCalculateAverageComponent } from './agent-calculate-average.component';

describe('AgentCalculateAverageComponent', () => {
  let component: AgentCalculateAverageComponent;
  let fixture: ComponentFixture<AgentCalculateAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentCalculateAverageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentCalculateAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
