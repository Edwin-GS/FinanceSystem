import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateComponentComponent } from './create-update-component.component';

describe('CreateUpdateComponentComponent', () => {
  let component: CreateUpdateComponentComponent;
  let fixture: ComponentFixture<CreateUpdateComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateComponentComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
