import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorCardComponent } from './guarantor-table.component';

describe('GuarantorCardComponent', () => {
  let component: GuarantorCardComponent;
  let fixture: ComponentFixture<GuarantorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuarantorCardComponent]
    });
    fixture = TestBed.createComponent(GuarantorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
