import { TestBed } from '@angular/core/testing';

import { SubitemService } from './subitem.service';

describe('SubitemServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubitemService = TestBed.get(SubitemService);
    expect(service).toBeTruthy();
  });
});
