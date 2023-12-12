import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBrandComponent } from './create-update-brand.component';

describe('CreateUpdateBrandComponent', () => {
  let component: CreateUpdateBrandComponent;
  let fixture: ComponentFixture<CreateUpdateBrandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateBrandComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
