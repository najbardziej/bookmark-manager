import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { BookmarksGuard } from './bookmarks.guard';

describe('BookmarksGuard', () => {
  let guard: BookmarksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule]
    });
    guard = TestBed.inject(BookmarksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
