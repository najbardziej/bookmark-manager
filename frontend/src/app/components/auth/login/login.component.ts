import { Component, OnInit } from '@angular/core';
import { LoginRequest } from './login.request';

@Component({
  selector: 'bm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest;

  constructor() {
    this.loginRequest = {
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }
  loginUser(): void{}

}
