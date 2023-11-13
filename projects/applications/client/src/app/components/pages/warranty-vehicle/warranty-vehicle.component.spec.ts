import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyVehicleComponent } from './warranty-vehicle.component';

describe('WarrantyVehicleComponent', () => {
  let component: WarrantyVehicleComponent;
  let fixture: ComponentFixture<WarrantyVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarrantyVehicleComponent]
    });
    fixture = TestBed.createComponent(WarrantyVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
