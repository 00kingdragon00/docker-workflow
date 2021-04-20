import { TestBed } from '@angular/core/testing';

import { FibService } from './fib.service';

describe('FibService', () => {
  let service: FibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
