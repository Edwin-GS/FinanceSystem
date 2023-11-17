import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyVehicleDetailsComponent } from './warranty-vehicle-details.component';

describe('WarrantyVehicleDetailsComponent', () => {
  let component: WarrantyVehicleDetailsComponent;
  let fixture: ComponentFixture<WarrantyVehicleDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarrantyVehicleDetailsComponent]
    });
    fixture = TestBed.createComponent(WarrantyVehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
