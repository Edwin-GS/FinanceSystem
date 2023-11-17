import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateModelComponent } from './create-update-model.component';

describe('CreateUpdateModelComponent', () => {
  let component: CreateUpdateModelComponent;
  let fixture: ComponentFixture<CreateUpdateModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateModelComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
