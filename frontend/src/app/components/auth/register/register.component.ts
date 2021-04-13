import { Component, OnInit } from '@angular/core';
// import {RegisterRequest} from './register.request';

@Component({
  selector: 'bm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // registerRequest: RegisterRequest;

  constructor() {
    // this.registerRequest = {
    //   email: '',
    //   password: ''
    // };
  }

  ngOnInit(): void {
  }
}
