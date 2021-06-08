import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Folder} from '../../folder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private folderUrl = environment.apiUrl + 'Category';

  constructor(private http: HttpClient) { }

  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(this.folderUrl).pipe(
      tap(data => console.log('Folder log:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addFolder(model: Folder): Observable<Folder> {
    return this.http.post<Folder>(`${this.folderUrl}`, model).pipe(
      map((response: Folder) =>  {
        return response;
      })
    );
  }

  addNestedFolder(model: Folder, parentId: number): Observable<Folder> {
    return this.http.post<Folder>(`${this.folderUrl}/${parentId}`, model).pipe(
      map((response: Folder) =>  {
        return response;
      })
    );
  }

  editFolder(model: Folder): Observable<Folder> {
    return this.http.put<Folder>(`${this.folderUrl}/${model.id}`, model).pipe(
      map((response: Folder) =>  {
        return response;
      })
    );
  }

  deleteFolder(model: Folder): Observable<Folder> {
    return this.http.delete<Folder>(`${this.folderUrl}/${model.id}`).pipe(
      map((response: Folder) =>  {
        return response;
      })
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
