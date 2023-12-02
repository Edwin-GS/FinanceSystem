import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestDetailsComponent } from './loan-request-details.component';

describe('LoanRequestDetailsComponent', () => {
  let component: LoanRequestDetailsComponent;
  let fixture: ComponentFixture<LoanRequestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanRequestDetailsComponent]
    });
    fixture = TestBed.createComponent(LoanRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
