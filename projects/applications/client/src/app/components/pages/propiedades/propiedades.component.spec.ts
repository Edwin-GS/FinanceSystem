import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesComponent } from './propiedades.component';

describe('PropiedadesComponent', () => {
  let component: PropiedadesComponent;
  let fixture: ComponentFixture<PropiedadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropiedadesComponent]
    });
    fixture = TestBed.createComponent(PropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
