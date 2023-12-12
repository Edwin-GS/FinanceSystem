import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiAppsComponent } from './mi-apps.component';

describe('MiAppsComponent', () => {
  let component: MiAppsComponent;
  let fixture: ComponentFixture<MiAppsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiAppsComponent]
    });
    fixture = TestBed.createComponent(MiAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
