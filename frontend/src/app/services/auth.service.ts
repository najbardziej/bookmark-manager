
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../model/user';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  private baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient, private router: Router) {
  }
  login(model: User): Observable<User>{
    return this.saveUser(model, 'Account/login');
  }
  register(model: User): Observable<User>{
    return this.saveUser(model, 'Account/register');
  }

  logout(): void{
    localStorage.removeItem('user');
  }

  private saveUser(model: User, url: string): Observable<User>{
    console.log(this.baseUrl + url)
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
