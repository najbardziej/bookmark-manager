import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Bookmark} from '../bookmark';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarkUrl = 'api/Bookmark/bookmarks.json';

  constructor(private http: HttpClient) { }

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.bookmarkUrl).pipe(
      tap(data => console.log('Bookmark log:', JSON.stringify(data))),
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
    console.log(errorMessage);  // wysłanie danych do odpowiednich logów
    return throwError(errorMessage);
  }
}
