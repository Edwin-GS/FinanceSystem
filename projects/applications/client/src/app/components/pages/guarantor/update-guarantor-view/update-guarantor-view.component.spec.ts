import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGuarantorViewComponent } from './update-guarantor-view.component';

describe('UpdateGuarantorViewComponent', () => {
  let component: UpdateGuarantorViewComponent;
  let fixture: ComponentFixture<UpdateGuarantorViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateGuarantorViewComponent]
    });
    fixture = TestBed.createComponent(UpdateGuarantorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
