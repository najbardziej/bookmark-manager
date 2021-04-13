import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthResponse} from '../../components/auth/auth.response';

const baseUrl = 'https://localhost:5001/account/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  addUser(data: any): Observable<any> {
    return this.http.post<AuthResponse>(baseUrl, data);
      // .pipe(map(data => {
      //   this.localStorage.store('token', data.authenticationToken);
      //   this.localStorage.store('userName', data.username);
      //   return true;
      // }));
  }
}
