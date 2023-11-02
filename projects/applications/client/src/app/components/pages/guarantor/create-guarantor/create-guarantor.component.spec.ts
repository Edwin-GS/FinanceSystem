import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGuarantorComponent } from './create-guarantor.component';

describe('CreateGuarantorComponent', () => {
  let component: CreateGuarantorComponent;
  let fixture: ComponentFixture<CreateGuarantorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGuarantorComponent]
    });
    fixture = TestBed.createComponent(CreateGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
