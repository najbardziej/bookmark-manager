import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Bookmark} from '../bookmark';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarkUrl = `${environment.apiUrl}Bookmark`;

  constructor(private http: HttpClient) { }

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.bookmarkUrl).pipe(
      tap(data => console.log('Bookmark log:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addBookmark(model: Bookmark): Observable<Bookmark> {
    if (model.category == undefined)
    model.category = null

    return this.http.post<Bookmark>(`${this.bookmarkUrl}`, model).pipe(
      map((response: Bookmark) =>  {
        return response;
      })
    );
  }

  editBookmark(model: Bookmark): Observable<Bookmark> {
    return this.http.put<Bookmark>(`${this.bookmarkUrl}/${model.bookmarkId}`, model).pipe(
      map((response: Bookmark) =>  {
        return response;
      })
    );
  }

  deleteBookmark(model: Bookmark): Observable<Bookmark> {
    return this.http.delete<Bookmark>(`${this.bookmarkUrl}/${model.bookmarkId}`).pipe(
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
