import { TestBed, async, inject } from '@angular/core/testing';

import { AuthnavGuard } from './authnav.guard';

describe('AuthnavGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthnavGuard]
    });
  });

  it('should ...', inject([AuthnavGuard], (guard: AuthnavGuard) => {
    expect(guard).toBeTruthy();
  }));
});
