import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeComponent } from './vehicle-type.component';

describe('VehicleTypeComponent', () => {
  let component: VehicleTypeComponent;
  let fixture: ComponentFixture<VehicleTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleTypeComponent]
    });
    fixture = TestBed.createComponent(VehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
