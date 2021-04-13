import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from './register.request';
import { RegisterService } from '../../../services/auth/register.service';

@Component({
  selector: 'bm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerRequest: RegisterRequest;

  constructor(private registerService: RegisterService) {
    this.registerRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }
  registerUser(): void{
    this.registerService.addUser(this.registerRequest);
  }
}
