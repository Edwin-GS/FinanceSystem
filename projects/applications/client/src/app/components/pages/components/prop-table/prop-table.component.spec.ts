import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsTableComponent } from './prop-table.component';

describe('PropsTableComponent', () => {
  let component: PropsTableComponent;
  let fixture: ComponentFixture<PropsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropsTableComponent]
    });
    fixture = TestBed.createComponent(PropsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
