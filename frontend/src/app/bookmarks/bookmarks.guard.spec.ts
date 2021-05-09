import { TestBed } from '@angular/core/testing';

import { BookmarksGuard } from './bookmarks.guard';

describe('BookmarksGuard', () => {
  let guard: BookmarksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BookmarksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
