import { TestBed } from '@angular/core/testing';

import { Selector } from './selector';

describe('Selector', () => {
  let service: Selector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Selector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
