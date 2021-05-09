import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Folder} from '../../folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private folderUrl = 'api/Folders/folders.json';

  constructor(private http: HttpClient) { }

  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(this.folderUrl).pipe(
      tap(data => console.log('Folder log:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);  // send data to log service
    return throwError(errorMessage);
  }
}
