import { TestBed } from '@angular/core/testing';

import { FolderService } from './folder.service';

describe('FolderServiceService', () => {
  let service: FolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
