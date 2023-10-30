import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMarcaComponent } from './create-update-marca.component';

describe('CreateUpdateMarcaComponent', () => {
  let component: CreateUpdateMarcaComponent;
  let fixture: ComponentFixture<CreateUpdateMarcaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateMarcaComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
