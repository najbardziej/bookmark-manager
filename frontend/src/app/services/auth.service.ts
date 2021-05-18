
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../model/user';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  private baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {
  }
  login(model: User): Observable<User>{
    return this.saveUser(model, 'Account/login');
  }
  register(model: User): Observable<User>{
    return this.saveUser(model, 'Account/register');
  }
  private saveUser(model: User, url: string): Observable<User>{
    return this.httpClient.post<User>(this.baseUrl + url, model).pipe(
      map((response: User) =>  {
        const user = response;
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      })
    );
  }
}
