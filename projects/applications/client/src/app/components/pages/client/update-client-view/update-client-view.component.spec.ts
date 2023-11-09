import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientViewComponent } from './update-client-view.component';

describe('UpdateClientViewComponent', () => {
  let component: UpdateClientViewComponent;
  let fixture: ComponentFixture<UpdateClientViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateClientViewComponent]
    });
    fixture = TestBed.createComponent(UpdateClientViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
