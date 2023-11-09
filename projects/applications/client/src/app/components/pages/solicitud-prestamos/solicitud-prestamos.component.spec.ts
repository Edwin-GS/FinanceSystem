import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPrestamosComponent } from './solicitud-prestamos.component';

describe('SolicitudPrestamosComponent', () => {
  let component: SolicitudPrestamosComponent;
  let fixture: ComponentFixture<SolicitudPrestamosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudPrestamosComponent]
    });
    fixture = TestBed.createComponent(SolicitudPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
