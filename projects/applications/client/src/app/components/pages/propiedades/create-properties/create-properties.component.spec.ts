import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropertiesComponent } from './create-properties.component';

describe('CreatePropertiesComponent', () => {
  let component: CreatePropertiesComponent;
  let fixture: ComponentFixture<CreatePropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePropertiesComponent]
    });
    fixture = TestBed.createComponent(CreatePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
