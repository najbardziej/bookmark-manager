import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Tag} from '../../tag';
import { environment } from 'src/environments/environment';
import {Folder} from "../../folder";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tagUrl = environment.apiUrl + 'Tag';

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagUrl).pipe(
      tap(data => console.log('Tag log:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addTag(model: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.tagUrl}`, model).pipe(
      map((response: Tag) =>  {
        return response;
      })
    );
  }

  editTag(model: Tag): Observable<Tag> {
    console.log(model);
    return this.http.put<Tag>(`${this.tagUrl}/${model.id}`, model).pipe(
      map((response: Tag) =>  {
        return response;
      })
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);  // send data to log service
    return throwError(errorMessage);
  }

}
