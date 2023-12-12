import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateVehicleTypeComponent } from './create-update-vehicle-type.component';

describe('CreateUpdateVehicleTypeComponent', () => {
  let component: CreateUpdateVehicleTypeComponent;
  let fixture: ComponentFixture<CreateUpdateVehicleTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateVehicleTypeComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateVehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
