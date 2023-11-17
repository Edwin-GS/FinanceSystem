import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorComponent } from './guarantor.component';

describe('GuarantorComponent', () => {
  let component: GuarantorComponent;
  let fixture: ComponentFixture<GuarantorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuarantorComponent]
    });
    fixture = TestBed.createComponent(GuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
