import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDemandsComponent } from './review-demands.component';

describe('ReviewDemandsComponent', () => {
  let component: ReviewDemandsComponent;
  let fixture: ComponentFixture<ReviewDemandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewDemandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
