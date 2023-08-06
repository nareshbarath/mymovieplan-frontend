import { TestBed } from '@angular/core/testing';

import { ShowsServiceService } from './shows-service.service';

describe('ShowsServiceService', () => {
  let service: ShowsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
