import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePropsComponent } from './update-propiedades.component';

describe('CreateUpdatePropsComponent', () => {
  let component: CreateUpdatePropsComponent;
  let fixture: ComponentFixture<CreateUpdatePropsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdatePropsComponent]
    });
    fixture = TestBed.createComponent(CreateUpdatePropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
