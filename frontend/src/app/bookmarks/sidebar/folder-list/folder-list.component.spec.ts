import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderListComponent } from './folder-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

describe('FolderListComponent', () => {
  let component: FolderListComponent;
  let fixture: ComponentFixture<FolderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderListComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule, FormsModule, MDBBootstrapModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
