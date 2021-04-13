import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../components/auth/auth.response';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequest } from '../../components/auth/login/login.request';

const baseUrl = 'https://localhost:5001/account/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
  }

  loginUser(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<AuthResponse>(baseUrl, loginRequest)
      .pipe(map(data => {
        this.localStorage.store('token', data.token);
        this.localStorage.store('userName', data.userName);
        return true;
      }));
  }
  getJwt(): string{
    return this.localStorage.retrieve('token');
  }
}
