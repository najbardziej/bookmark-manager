import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Bookmark} from '../bookmark';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarkUrl = 'https://localhost:5001/Bookmark';

  constructor(private http: HttpClient) { }

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.bookmarkUrl).pipe(
      tap(data => console.log('Bookmark log:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  editBookmark(model: Bookmark): Observable<Bookmark> {
    console.log(model);
    return this.http.put<Bookmark>(`${this.bookmarkUrl}/${model.bookmarkId}`, model).pipe(
      map((response: Bookmark) =>  {
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
    console.log(err);
    console.log(errorMessage);  // wysłanie danych do odpowiednich logów
    return throwError(errorMessage);
  }
}
