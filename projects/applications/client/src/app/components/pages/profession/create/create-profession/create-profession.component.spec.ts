import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfessionComponent } from './create-profession.component';

describe('CreateProfessionComponent', () => {
  let component: CreateProfessionComponent;
  let fixture: ComponentFixture<CreateProfessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProfessionComponent]
    });
    fixture = TestBed.createComponent(CreateProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
