import { Component, OnInit } from '@angular/core';
import { LoginRequest } from './login.request';
import {LoginService} from '../../../services/auth/login.service';

@Component({
  selector: 'bm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest;

  constructor(private loginService: LoginService) {
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }
  loginUser(): void{
    this.loginService.loginUser(this.loginRequest);
  }

}
