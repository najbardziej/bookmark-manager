import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksListComponent } from './bookmarks-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MDBRootModule} from 'angular-bootstrap-md';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookmarksListComponent', () => {
  let component: BookmarksListComponent;
  let fixture: ComponentFixture<BookmarksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarksListComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule, FormsModule, MDBRootModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
