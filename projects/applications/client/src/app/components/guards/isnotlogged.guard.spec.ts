import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { isnotloggedGuard } from './isnotlogged.guard';

describe('isnotloggedGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isnotloggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
