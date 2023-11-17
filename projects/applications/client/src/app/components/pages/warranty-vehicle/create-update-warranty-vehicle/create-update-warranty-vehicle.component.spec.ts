import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateWarrantyVehicleComponent } from './create-update-warranty-vehicle.component';

describe('CreateUpdateWarrantyVehicleComponent', () => {
  let component: CreateUpdateWarrantyVehicleComponent;
  let fixture: ComponentFixture<CreateUpdateWarrantyVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateWarrantyVehicleComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateWarrantyVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
