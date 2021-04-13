import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../components/auth/auth.response';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import {RegisterRequest} from '../../components/auth/register/register.request';

const baseUrl = 'https://localhost:5001/account/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
  }

  addUser(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<AuthResponse>(baseUrl, registerRequest)
      .pipe(map(data => {
        this.localStorage.store('token', data.token);
        this.localStorage.store('userName', data.userName);
        return true;
      }));
  }
}
